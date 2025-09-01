import { BarChart3, Users, Target, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function ContentAbout2() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <Image
                src="/apnacollege studentplaced.png"
                alt="apna college"
                height={400}
                width={500}
                className="w-full rounded-3xl shadow-lg"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Data-driven results you can trust</h2>
            <p className="text-xl text-gray-600 mb-8">
              Get to meet top companies around the world with our industry grained courses and land your dream job.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 bg-gradient-to-t from-gray-300 rounded-xl to-blue-700 text-blue-100" />
                  
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">1% Community</div>
                <div className="text-sm text-gray-600">Community of top 1% developers</div>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 bg-gradient-to-t from-gray-300 rounded-xl to-green-700 text-green-100" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">99%</div>
                <div className="text-sm text-gray-600">99% student placed</div>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 bg-gradient-to-t from-gray-300 rounded-xl to-purple-700 text-purple-100" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">10 LPA</div>
                <div className="text-sm text-gray-600">Average Package of 10LPA</div>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 bg-gradient-to-t from-gray-300 rounded-xl to-orange-700 text-orange-100" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">Industry grained courses</div>
                <div className="text-sm text-gray-600">Optimize your development</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
