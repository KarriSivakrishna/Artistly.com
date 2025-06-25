"use client"

import type React from "react"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MultiSelect } from "@/components/ui/multi-select"
import { Progress } from "@/components/ui/progress"
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { OnboardingFormData, FormSection } from "@/types/onboarding"
import { submitArtistProfile } from "@/lib/mockApi"

// Validation schema
const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  bio: yup
    .string()
    .required("Bio is required")
    .min(50, "Bio must be at least 50 characters")
    .max(500, "Bio must be less than 500 characters"),
  categories: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one category")
    .max(3, "Please select no more than 3 categories"),
  languages: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one language")
    .max(5, "Please select no more than 5 languages"),
  feeRange: yup.string().required("Fee range is required"),
  location: yup.string().required("Location is required").min(3, "Location must be at least 3 characters"),
})

// Form sections for multi-step experience
const formSections: FormSection[] = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Tell us about yourself and your background",
  },
  {
    id: "professional",
    title: "Professional Details",
    description: "Share your expertise and specializations",
  },
  {
    id: "media",
    title: "Profile & Location",
    description: "Add your photo and location details",
  },
]

// Options data
const categoryOptions = [
  { label: "Singer", value: "singer" },
  { label: "Dancer", value: "dancer" },
  { label: "Speaker", value: "speaker" },
  { label: "DJ", value: "dj" },
  { label: "Musician", value: "musician" },
  { label: "Comedian", value: "comedian" },
  { label: "Magician", value: "magician" },
  { label: "Actor", value: "actor" },
  { label: "Poet", value: "poet" },
  { label: "Other", value: "other" },
]

const languageOptions = [
  { label: "English", value: "english" },
  { label: "Spanish", value: "spanish" },
  { label: "French", value: "french" },
  { label: "German", value: "german" },
  { label: "Italian", value: "italian" },
  { label: "Portuguese", value: "portuguese" },
  { label: "Mandarin", value: "mandarin" },
  { label: "Japanese", value: "japanese" },
  { label: "Korean", value: "korean" },
  { label: "Arabic", value: "arabic" },
  { label: "Russian", value: "russian" },
  { label: "Hindi", value: "hindi" },
]

const feeRanges = ["$100-250", "$250-500", "$500-750", "$750-1000", "$1000-1500", "$1500-2000", "$2000-3000", "$3000+"]

export default function OnboardingForm() {
  const [currentSection, setCurrentSection] = useState(0)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, touchedFields },
    trigger,
    watch,
    setValue,
  } = useForm<OnboardingFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      bio: "",
      categories: [],
      languages: [],
      feeRange: "",
      location: "",
    },
  })

  // Watch form values for progress calculation
  const watchedValues = watch()

  // Calculate form completion progress
  const calculateProgress = () => {
    const fields = ["name", "bio", "categories", "languages", "feeRange", "location"]
    const completed = fields.filter((field) => {
      const value = watchedValues[field as keyof OnboardingFormData]
      if (Array.isArray(value)) return value.length > 0
      return value && value.toString().trim() !== ""
    }).length
    return Math.round((completed / fields.length) * 100)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      setProfileImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage(null)
    setImagePreview(null)
  }

  const nextSection = async () => {
    const fieldsToValidate = getSectionFields(currentSection)
    const isValid = await trigger(fieldsToValidate)

    if (isValid && currentSection < formSections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const getSectionFields = (sectionIndex: number): (keyof OnboardingFormData)[] => {
    switch (sectionIndex) {
      case 0:
        return ["name", "bio"]
      case 1:
        return ["categories", "languages", "feeRange"]
      case 2:
        return ["location"]
      default:
        return []
    }
  }

  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const formData = {
        ...data,
        profileImage,
      }

      const response = await submitArtistProfile(formData)

      if (response.success) {
        setSubmitStatus("success")
        setSubmitMessage(response.message)
      } else {
        setSubmitStatus("error")
        setSubmitMessage("Failed to create profile. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setSubmitMessage("An error occurred. Please try again.")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderPersonalSection = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-base font-medium">
          Full Name *
        </Label>
        <Input
          id="name"
          {...register("name")}
          className={errors.name ? "border-red-500" : ""}
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="bio" className="text-base font-medium">
          Bio *
        </Label>
        <Textarea
          id="bio"
          {...register("bio")}
          placeholder="Tell us about yourself, your experience, and what makes you unique..."
          rows={4}
          className={errors.bio ? "border-red-500" : ""}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.bio ? (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.bio.message}
            </p>
          ) : (
            <p className="text-sm text-gray-500">{watchedValues.bio?.length || 0}/500 characters</p>
          )}
        </div>
      </div>
    </div>
  )

  const renderProfessionalSection = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-2 block">Categories * (Select 1-3)</Label>
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <MultiSelect
              options={categoryOptions}
              selected={field.value || []}
              onChange={field.onChange}
              placeholder="Select your categories..."
              className={errors.categories ? "border-red-500" : ""}
            />
          )}
        />
        {errors.categories && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.categories.message}
          </p>
        )}
      </div>

      <div>
        <Label className="text-base font-medium mb-2 block">Languages Spoken * (Select 1-5)</Label>
        <Controller
          name="languages"
          control={control}
          render={({ field }) => (
            <MultiSelect
              options={languageOptions}
              selected={field.value || []}
              onChange={field.onChange}
              placeholder="Select languages you speak..."
              className={errors.languages ? "border-red-500" : ""}
            />
          )}
        />
        {errors.languages && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.languages.message}
          </p>
        )}
      </div>

      <div>
        <Label className="text-base font-medium mb-2 block">Fee Range *</Label>
        <Controller
          name="feeRange"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className={errors.feeRange ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your fee range" />
              </SelectTrigger>
              <SelectContent>
                {feeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.feeRange && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.feeRange.message}
          </p>
        )}
      </div>
    </div>
  )

  const renderMediaSection = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-2 block">Profile Image (Optional)</Label>
        {!imagePreview ? (
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 mb-2">Upload your profile image</p>
            <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
            <Label htmlFor="image-upload" className="cursor-pointer">
              <Button type="button" variant="outline" className="mt-4">
                Choose File
              </Button>
            </Label>
          </div>
        ) : (
          <div className="relative inline-block">
            <img
              src={imagePreview || "/placeholder.svg"}
              alt="Profile preview"
              className="w-32 h-32 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="location" className="text-base font-medium">
          Location *
        </Label>
        <Input
          id="location"
          {...register("location")}
          placeholder="City, State (e.g., New York, NY)"
          className={errors.location ? "border-red-500" : ""}
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.location.message}
          </p>
        )}
      </div>
    </div>
  )

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="p-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Profile Created Successfully!</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8">{submitMessage}</p>
              <div className="space-y-4">
                <Button onClick={() => (window.location.href = "/artists")} className="w-full sm:w-auto">
                  Browse Artists
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()} className="w-full sm:w-auto sm:ml-4">
                  Create Another Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Join Artistly</h1>
          <p className="text-gray-600 dark:text-gray-300">Create your artist profile and start getting booked</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress: {calculateProgress()}%
            </span>
            <span className="text-sm text-gray-500">
              Step {currentSection + 1} of {formSections.length}
            </span>
          </div>
          <Progress value={calculateProgress()} className="w-full" />
        </div>

        {/* Section Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {formSections.map((section, index) => (
              <div
                key={section.id}
                className={`flex items-center ${index <= currentSection ? "text-primary" : "text-gray-400"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index < currentSection
                      ? "bg-primary text-white"
                      : index === currentSection
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index < currentSection ? "✓" : index + 1}
                </div>
                {index < formSections.length - 1 && (
                  <div className={`w-12 h-0.5 ml-2 ${index < currentSection ? "bg-primary" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{formSections[currentSection].title}</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">{formSections[currentSection].description}</p>
            </CardHeader>
            <CardContent>
              {currentSection === 0 && renderPersonalSection()}
              {currentSection === 1 && renderProfessionalSection()}
              {currentSection === 2 && renderMediaSection()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={prevSection} disabled={currentSection === 0}>
              Previous
            </Button>

            {currentSection < formSections.length - 1 ? (
              <Button type="button" onClick={nextSection}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting || !isValid} className="min-w-32">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Profile"
                )}
              </Button>
            )}
          </div>

          {/* Error Alert */}
          {submitStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitMessage}</AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  )
}
