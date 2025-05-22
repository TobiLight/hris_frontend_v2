import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Building, Briefcase, Calendar, Edit, Award, GraduationCap, Languages } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProfileInfo() {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-sky-500 p-4 pb-20 text-white sm:pb-24">
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle className="text-xl">Personal Information</CardTitle>
            <CardDescription className="text-teal-100">Your profile details</CardDescription>
          </div>
          <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </CardHeader>
      <CardContent className="relative px-4 pb-6 pt-16 sm:px-6 sm:pt-20">
        <div className="absolute left-0 right-0 -top-16 flex flex-col items-center">
          <Avatar className="h-24 w-24 border-4 border-white shadow-xl sm:h-32 sm:w-32">
            <AvatarImage src="/placeholder.svg" alt="John Doe" />
            <AvatarFallback className="bg-gradient-to-br from-teal-500 to-sky-500 text-2xl font-bold text-white sm:text-3xl">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold sm:text-2xl">John Doe</h3>
            <p className="text-teal-600">Senior Travel Consultant</p>
            <p className="text-sm text-gray-500">Employee ID: EMP-2024-0042</p>
          </div>
        </div>

        <div className="mt-24 sm:mt-28">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 flex-shrink-0 text-teal-600" />
                    <p className="truncate">john.doe@btms.com</p>
                  </div>
                </div>
                <div className="space-y-1 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 flex-shrink-0 text-teal-600" />
                    <p className="truncate">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1 rounded-lg bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-500">Address</p>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-teal-600" />
                  <p className="truncate">123 Business Ave, Suite 456, New York, NY 10001</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0 text-teal-600" />
                    <p className="truncate">January 15, 1985</p>
                  </div>
                </div>
                <div className="space-y-1 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-500">Nationality</p>
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-6 flex-shrink-0 rounded bg-blue-500"></div>
                    <p className="truncate">United States</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="work" className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-500">Department</p>
                  <div className="flex items-center">
                    <Building className="mr-2 h-4 w-4 flex-shrink-0 text-teal-600" />
                    <p className="truncate">Travel Services</p>
                  </div>
                </div>
                <div className="space-y-1 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-500">Position</p>
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-4 w-4 flex-shrink-0 text-teal-600" />
                    <p className="truncate">Senior Travel Consultant</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-500">Hire Date</p>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0 text-teal-600" />
                    <p className="truncate">January 15, 2020</p>
                  </div>
                </div>
                <div className="space-y-1 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-500">Work Anniversary</p>
                  <div className="flex items-center">
                    <Award className="mr-2 h-4 w-4 flex-shrink-0 text-teal-600" />
                    <p className="truncate">4 years, 4 months</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-500">Manager</p>
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-6 flex-shrink-0 rounded-full bg-teal-600 text-center text-xs font-bold text-white leading-6">
                      JS
                    </div>
                    <p className="truncate">Jane Smith</p>
                  </div>
                </div>
                <div className="space-y-1 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-500">Office Location</p>
                  <div className="flex items-center">
                    <Building className="mr-2 h-4 w-4 flex-shrink-0 text-teal-600" />
                    <p className="truncate">New York HQ</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-500">Education</p>
                  <div className="flex items-center">
                    <GraduationCap className="mr-2 h-4 w-4 flex-shrink-0 text-teal-600" />
                    <p className="truncate">Bachelor's in Tourism Management</p>
                  </div>
                </div>
                <div className="space-y-1 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm font-medium text-gray-500">Languages</p>
                  <div className="flex items-center">
                    <Languages className="mr-2 h-4 w-4 flex-shrink-0 text-teal-600" />
                    <p className="truncate">English (Native), Spanish (Fluent), French (Basic)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 rounded-lg bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-500">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800">
                    Certified Travel Associate (CTA)
                  </span>
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-800">
                    Amadeus Certification
                  </span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                    Sabre GDS Expert
                  </span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                    Customer Service Excellence
                  </span>
                </div>
              </div>

              <div className="space-y-2 rounded-lg bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-500">Skills</p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800">
                    Travel Planning
                  </span>
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-800">
                    Corporate Bookings
                  </span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                    Itinerary Management
                  </span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                    Client Relations
                  </span>
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                    Travel Insurance
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                    Visa Processing
                  </span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
