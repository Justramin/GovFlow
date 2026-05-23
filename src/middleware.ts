import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // 1. Check for local mock credentials first (for easy development/testing)
  const mockRole = request.cookies.get('govflow-mock-role')?.value
  
  let userRole: string | null = mockRole || null
  let isAuthenticated = !!mockRole

  // 2. If no mock role, check real Supabase authentication
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  if (!isAuthenticated) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createServerClient(
          supabaseUrl,
          supabaseKey,
          {
            cookies: {
              getAll() {
                return request.cookies.getAll()
              },
              setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                supabaseResponse = NextResponse.next({
                  request,
                })
                cookiesToSet.forEach(({ name, value, options }) =>
                  supabaseResponse.cookies.set(name, value, options)
                )
              },
            },
          }
        )

        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          isAuthenticated = true
          // Fetch role from user_access_scope
          const { data: scopes } = await supabase
            .from('user_access_scope')
            .select('roles(name)')
            .eq('user_id', user.id)

          if (scopes && scopes.length > 0) {
            userRole = (scopes[0] as any).roles?.name || null
          } else {
            // Check user_roles
            const { data: userRoles } = await supabase
              .from('user_roles')
              .select('roles(name)')
              .eq('user_id', user.id)
            userRole = (userRoles?.[0]?.roles as any)?.name || 'SUPER_ADMIN'
          }
        }
      } catch (e) {
        // Fallback gracefully in case of connection/initialization issues
        console.error("Middleware Supabase connection error: ", e)
      }
    }
  }

  // Define route hierarchies and their required roles
  const dashboardRoutes = [
    { prefix: '/admin', role: 'SUPER_ADMIN', loginPath: '/admin/login' },
    { prefix: '/state', role: 'STATE_ADMIN', loginPath: '/state/login' },
    { prefix: '/district', role: 'DISTRICT_ADMIN', loginPath: '/district/login' },
    { prefix: '/division', role: 'DIVISION_ADMIN', loginPath: '/division/login' },
    { prefix: '/unit', role: 'UNIT_ADMIN', loginPath: '/unit/login' },
  ]

  const loginPaths = ['/login', '/admin/login', '/state/login', '/district/login', '/division/login', '/unit/login']

  // Find if current path is a protected dashboard
  const currentDashboard = dashboardRoutes.find(route => 
    pathname.startsWith(route.prefix) && !pathname.endsWith('/login')
  )

  if (currentDashboard) {
    if (!isAuthenticated) {
      // Redirect to the login page of this dashboard prefix
      url.pathname = currentDashboard.loginPath
      return NextResponse.redirect(url)
    }

    // Role-based access control (RBAC)
    if (userRole !== currentDashboard.role) {
      // User is logged in but trying to access a different tier.
      // Redirect them to their own correct tier!
      const correctDashboard = dashboardRoutes.find(route => route.role === userRole)
      if (correctDashboard) {
        url.pathname = correctDashboard.prefix
        return NextResponse.redirect(url)
      } else {
        // Fallback to generic login if role is unrecognized
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    }
  }

  // Auto-redirect logged-in users away from login pages
  if (loginPaths.includes(pathname)) {
    if (isAuthenticated && userRole) {
      const correctDashboard = dashboardRoutes.find(route => route.role === userRole)
      if (correctDashboard) {
        url.pathname = correctDashboard.prefix
        return NextResponse.redirect(url)
      }
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
