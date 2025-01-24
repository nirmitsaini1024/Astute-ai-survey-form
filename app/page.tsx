"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import Logooo from "@/assets/logooo.png"
import Image from "next/image"
import toast, { Toaster } from "react-hot-toast"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[\d\s-()]{10,}$/, "Invalid phone number"),
  hasWebsite: z.enum(["yes", "no"]),

  // Website owners fields
  websiteUse: z.string().optional(),
  businessIndustry: z.string().optional(),
  targetAudience: z.string().optional(),
  challenges: z.array(z.string()).optional(),
  implementedStrategies: z.enum(["yes", "no"]).optional(),
  campaigns: z.enum(["yes", "no"]).optional(),
  digitalperformance: z.enum(["yes", "no"]).optional(),
  joinWishlist: z.enum(["yes", "no"]).optional(),

  // Non-website owners fields
  wantWebsite: z.enum(["yes", "no"]).optional(),
  creationChallenges: z.array(z.string()).optional(),
  businessIndustryOther: z.string().optional(),
  websiteUseOther: z.string().optional(),
  targetAudienceOther: z.string().optional(),
})

export default function Home() {
  const [step, setStep] = useState(1)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      companyName: "",
      email: "",
      phone: "",
      hasWebsite: "no",
      challenges: [],
      creationChallenges: [],
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (step !== 2) {
      setStep(2)
      return
    }

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        toast.success("Form submitted successfully")

        form.reset()
        setStep(1)
      } else {
        toast.error("Form submission failed")
      }
    } catch (error) {
      toast.error("Error submitting form")
    }
  }

  const websiteChallenges = [
    "Attracting enough traffic",
    "Improving search engine rankings",
    "Maintaining or updating content regularly",
    "Poor user experience or navigation design",
    "Generating leads or conversions",
    "Measuring and analyzing website performance",
    "Other",
  ]

  const creationChallenges = [
    "Lack of technical skills or knowledge",
    "Difficulty choosing the right platform or tools",
    "High development and maintenance costs",
    "Creating visually appealing and user-friendly designs",
    "Writing engaging and SEO-friendly content",
    "Ensuring compatibility across devices and browsers",
    "Setting up hosting and domain management",
    "Managing security and protecting against cyber threats",
    "Limited time to focus on development",
    "Other",
  ]

  const nextStep = () => {
    if (step === 1) {
      if (
        form.getValues("name") &&
        form.getValues("companyName") &&
        form.getValues("email") &&
        form.getValues("phone")
      ) {
        setStep(2)
      } else {
        form.trigger(["name", "companyName", "email", "phone"])
      }
    }
  }

  const prevStep = () => setStep(step - 1)

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Image
            src={Logooo || "/placeholder.svg"}
            height={40}
            width={40}
            className="object-contain"
            alt="Stute.ai Logo"
          />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-purple-700 bg-clip-text text-transparent">
            Astute ai
          </h1>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-white bg-clip-text text-transparent">Business Information Form</h1>
        <div className="flex gap-2 mb-8">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gray-700"
              }`}
            />
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6 bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} className="bg-gray-900 border-gray-700" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} className="bg-gray-900 border-gray-700" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" {...field} className="bg-gray-900 border-gray-700" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} className="bg-gray-900 border-gray-700" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="hasWebsite"
                  render={({ field }) => (
                    <FormItem className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800">
                      <FormLabel className="text-lg">Do you have a website?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2 mt-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal text-base text-zinc-400">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal text-base text-zinc-400">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("hasWebsite") === "yes" && (
                  <div className="space-y-8">
                    <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800 space-y-6">
                      <FormField
                        control={form.control}
                        name="websiteUse"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">What is the primary use of your website?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value)
                                  if (value !== "Other") {
                                    form.setValue("websiteUseOther", "")
                                  }
                                }}
                                value={field.value}
                                className="flex flex-col space-y-2 mt-4 text-zinc-400"
                              >
                                {[
                                  "Attracting more visitors",
                                  "Generating leads or sales",
                                  "Sharing information about your business",
                                  "Other",
                                ].map((option) => (
                                  <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={option} />
                                    </FormControl>
                                    <FormLabel className="font-normal text-base">{option}</FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("websiteUse") === "Other" && (
                        <FormField
                          control={form.control}
                          name="websiteUseOther"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg">Please specify:</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter the primary use of your website"
                                  className="bg-gray-900 border-gray-700"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="businessIndustry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">What is your business industry?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value)
                                  if (value !== "Other") {
                                    form.setValue("businessIndustryOther", "")
                                  }
                                }}
                                value={field.value}
                                className="flex flex-col space-y-2 mt-4 text-zinc-400"
                              >
                                {[
                                  "Technology",
                                  "E-commerce",
                                  "Healthcare",
                                  "Education",
                                  "Finance",
                                  "Real Estate",
                                  "Entertainment",
                                  "Travel and Hospitality",
                                  "Retail",
                                  "Other",
                                ].map((option) => (
                                  <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={option} />
                                    </FormControl>
                                    <FormLabel className="font-normal text-base">{option}</FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("businessIndustry") === "Other" && (
                        <FormField
                          control={form.control}
                          name="businessIndustryOther"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg">Please specify:</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your business industry"
                                  className="bg-gray-900 border-gray-700"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="targetAudience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">Who is your target audience?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value)
                                  if (value !== "Other") {
                                    form.setValue("targetAudienceOther", "")
                                  }
                                }}
                                value={field.value}
                                className="flex flex-col space-y-2 mt-4 text-zinc-400"
                              >
                                {[
                                  "Businesses (B2B)",
                                  "Individual Consumers (B2C)",
                                  "Students",
                                  "Professionals",
                                  "Small and Medium Enterprises (SMEs)",
                                  "Large Corporations",
                                  "Non-Profit Organizations",
                                  "Other",
                                ].map((option) => (
                                  <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={option} />
                                    </FormControl>
                                    <FormLabel className="font-normal text-base">{option}</FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("targetAudience") === "Other" && (
                        <FormField
                          control={form.control}
                          name="targetAudienceOther"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg">Please specify:</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your target audience"
                                  className="bg-gray-900 border-gray-700"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800 space-y-6">
                      <FormField
                        control={form.control}
                        name="implementedStrategies"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">
                              Have you implemented any SEO strategies/tools for your website?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-2 mt-4"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base text-zinc-400">Yes</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="no" />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base text-zinc-400">No</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="campaigns"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">
                              Are you utilizing any AI tools or collaborating with a marketing agency for your
                              campaigns?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-2 mt-4"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base text-zinc-400">Yes</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="no" />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base text-zinc-400">No</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="digitalperformance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">
                              Do you use any tools to analyze your digital performance?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-2 mt-4"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base text-zinc-400">Yes</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="no" />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base text-zinc-400">No</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="joinWishlist"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">
                              Would you like to be added to Astute's wishlist for AI tools?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-2 mt-4"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base">Yes</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="no" />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base">No</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {form.watch("hasWebsite") === "no" && (
                  <div className="space-y-8">
                    <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800">
                      <FormField
                        control={form.control}
                        name="wantWebsite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">Do you want to build a website?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-2 mt-4"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base text-zinc-400">Yes</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="no" />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base text-zinc-400">No</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="creationChallenges"
                      render={() => (
                        <FormItem className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800">
                          <FormLabel className="text-lg">
                            What challenges do you face when creating a website?
                          </FormLabel>
                          <div className="space-y-3 mt-4">
                            {creationChallenges.map((challenge) => (
                              <FormField
                                key={challenge}
                                control={form.control}
                                name="creationChallenges"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-3 space-y-0 text-zinc-400">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(challenge)}
                                        onCheckedChange={(checked) => {
                                          const current = field.value || []
                                          const updated = checked
                                            ? [...current, challenge]
                                            : current.filter((value) => value !== challenge)
                                          field.onChange(updated)
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-base">{challenge}</FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="bg-transparent border-gray-700 hover:bg-gray-800"
                >
                  Previous
                </Button>
              )}
              <Button
                type="submit"
                className="ml-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {step < 2 ? "Next" : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

