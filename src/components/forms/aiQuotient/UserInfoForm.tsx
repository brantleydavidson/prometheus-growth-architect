import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UserInfo } from "@/types/aiQuotient";

const formSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  companySize: z.string().min(1, "Company size is required"),
});

interface UserInfoFormProps {
  userInfo: UserInfo;
  onSubmit: (data: UserInfo) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ userInfo, onSubmit }) => {
  const form = useForm<UserInfo>({
    resolver: zodResolver(formSchema),
    defaultValues: userInfo,
  });

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Information</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="companySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Size</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "1-10",
                      "11-50",
                      "51-200",
                      "201-500",
                      "501-1000",
                      "1000+",
                    ].map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-4">
            <Button type="submit" className="w-full">
              Start Assessment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserInfoForm;
