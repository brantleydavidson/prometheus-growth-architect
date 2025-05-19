import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UserInfo, AssessmentResult } from "@/types/aiQuotient";
import { Check, Loader2 } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  jobTitle: z.string().min(1, "Job title is required"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

interface SubmitResultsFormProps {
  userInfo: UserInfo;
  result: AssessmentResult;
  onSubmit: (result: AssessmentResult) => Promise<boolean>;
  onUpdateUserInfo: (data: Partial<UserInfo>) => void;
}

const SubmitResultsForm: React.FC<SubmitResultsFormProps> = ({
  userInfo,
  result,
  onSubmit,
  onUpdateUserInfo,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: userInfo.firstName ?? "",
      lastName: userInfo.lastName ?? "",
      email: userInfo.email ?? "",
      jobTitle: userInfo.jobTitle ?? "",
      acceptTerms: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { acceptTerms, ...userDetails } = data;
      const updatedUserInfo = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        jobTitle: userDetails.jobTitle,
        company: userInfo.company,
        companySize: userInfo.companySize,
      };
      
      console.log("Form submission data:", {
        formData: userDetails,
        updatedUserInfo,
        existingUserInfo: userInfo
      });
      
      const updatedResult = {
        ...result,
        userInfo: updatedUserInfo
      };
      
      onUpdateUserInfo(updatedUserInfo);
      
      const success = await onSubmit(updatedResult);
      
      if (success) {
        setIsSubmitted(true);
      } else {
        setError("There was an error submitting your assessment. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isSubmitted ? "Thank You!" : "Get Your Detailed Report"}
      </h2>
      
      {isSubmitted ? (
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
            <Check className="h-8 w-8" />
          </div>
          
          <p className="text-lg mb-6">
            Your AI Quotient Assessment has been submitted successfully. We'll prepare a detailed report and action plan for your organization.
          </p>
          
          <div className="p-4 bg-gray-50 rounded-md mb-6">
            <h3 className="font-medium mb-2">What to expect next:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>You'll receive an email with your detailed report</li>
              <li>A member of our team will reach out to schedule a strategy session</li>
              <li>We'll provide tailored recommendations for your AI implementation</li>
            </ul>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-6 text-center">
            Submit your assessment to receive a detailed analysis of your organization's AI readiness and personalized recommendations.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-md mb-8">
            <h3 className="font-medium mb-3">Assessment Summary:</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Overall Score:</span>
                <span className="font-medium">{result.percentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Readiness Level:</span>
                <span className="font-medium">{result.readinessLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Company:</span>
                <span className="font-medium">{userInfo.company}</span>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="p-3 mb-6 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="CMO" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I accept the terms and conditions
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit & Get Report"
                )}
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default SubmitResultsForm;
