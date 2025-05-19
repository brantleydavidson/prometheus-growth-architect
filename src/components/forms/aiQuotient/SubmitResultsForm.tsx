import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UserInfo } from "@/types/aiQuotient";

const formSchema = z.object({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

interface SubmitResultsFormProps {
  userInfo: UserInfo;
  onSubmit: (data: UserInfo) => void;
}

const SubmitResultsForm: React.FC<SubmitResultsFormProps> = ({ userInfo, onSubmit }) => {
  const form = useForm<{ acceptTerms: boolean }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const handleSubmit = (data: { acceptTerms: boolean }) => {
    if (data.acceptTerms) {
      onSubmit(userInfo);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Submit Your Results</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
          
          <div className="pt-4">
            <Button type="submit" className="w-full">
              Submit Results
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SubmitResultsForm;
