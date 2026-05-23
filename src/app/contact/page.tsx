import { Navbar } from "@/components/layout/Navbar";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-gray-600">
              Have questions or need assistance? Reach out to our state headquarters or find your local district committee.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-6 text-xl">State Headquarters</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Address</h4>
                      <p className="text-sm text-gray-500 mt-1">Association House, Pattom, Thiruvananthapuram, Kerala - 695004</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Phone</h4>
                      <p className="text-sm text-gray-500 mt-1">+91 471 244 55XX</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Email</h4>
                      <p className="text-sm text-gray-500 mt-1">info@ksebwa.org</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary p-8 rounded-3xl text-white shadow-xl shadow-primary/20">
                <h3 className="font-bold mb-4 text-xl flex items-center gap-2">
                  <MessageCircle />
                  WhatsApp Support
                </h3>
                <p className="text-white/80 text-sm mb-6">Join our official broadcast channel for instant updates.</p>
                <button className="w-full py-3 bg-white text-primary rounded-xl font-bold hover:bg-gray-100 transition-all">
                  Join Channel
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white p-10 rounded-3xl border border-gray-100 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Send a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Employee ID (Optional)</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" placeholder="KSEBXXXX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Message</label>
                  <textarea rows={5} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" placeholder="Write your message here..."></textarea>
                </div>
                <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p>© 2026 KSEB Workers Association. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
