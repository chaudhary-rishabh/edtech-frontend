import { Shield, Zap, Globe } from "lucide-react"
import Image from "next/image"

export default function ContentAbout() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Students choose Apna College</h2>
            <p className="text-xl text-gray-600 mb-8">
              We've built the most comprehensive platform for coaching students, helping folks connect with authentic
              voices and drive real results.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Production ready folks</h3>
                  <p className="text-gray-600">
                    All students at apna college are thoroughly vetted to ensure quality and authenticity.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                  <p className="text-gray-600">Launch campaigns in minutes, not weeks with our streamlined process.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Reach</h3>
                  <p className="text-gray-600">Advanced SEO optimized integration with user friendly content.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <Image
                src="/apnacollege sigma9.png"
                alt="apna college"
                height={400}
                width={500}
                className="w-full rounded-3xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
