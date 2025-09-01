import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail } from "lucide-react"

export default function EmailCTA() {
  return (
    <section className="py-20 px-6 bg-white mx-auto">
      <div className="max-w-4xl bg-gradient-to-br shadow-2xl shadow-gray-500/30 from-indigo-400 via-gray-50 to-white rounded-[40px] p-10 mx-auto text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Stay in the loop</h2>
          <p className="text-xl text-black max-w-2xl mx-auto">
            Get the latest insights on Latest Designs, platform updates, and exclusive tips delivered to your inbox.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/80 rounded-xl text-gray-600 placeholder:text-gray-700 outline-none"
            />
            <Button className="bg-gradient-to-br from-indigo-500 via-gray-300 hover:via-gray-100 to-purple-600 hover:to-purple-500 text-gray-900 font-bold hover:shadow-xl rounded-xl hover:bg-white px-6 flex items-center space-x-2 whitespace-nowrap transition duration-500">
              <span>Subscribe</span>
              <ArrowRight className="h-4 w-4 font-bold" />
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-4">No spam, unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
