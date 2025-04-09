"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  associationFormSchema,
  donorFormSchema,
} from "@/utils/validations/auth";
import { signupAssociation, signupUser } from "@/actions/auth";
import { useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const isSignAsAssociation = searchParams.get("as") === "association";
  const [activeTab, setActiveTab] = useState(
    isSignAsAssociation ? "association" : "user"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Donor form
  const donorForm = useForm<z.infer<typeof donorFormSchema>>({
    resolver: zodResolver(donorFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
    },
  });

  // Association form
  const associationForm = useForm<z.infer<typeof associationFormSchema>>({
    resolver: zodResolver(associationFormSchema),
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      about: "",
      website: "",
      phone: "",
      location: "",
      type: "",
      customType: "",
      registrationNumber: "",
    },
  });

  async function onDonorSubmit(values: z.infer<typeof donorFormSchema>) {
    setIsSubmitting(true);
    const error = await signupUser(values);
    if (error) alert(error);
    else alert("Donor registration successful!");
    setIsSubmitting(false);
  }

  async function onAssociationSubmit(
    values: z.infer<typeof associationFormSchema>
  ) {
    setIsSubmitting(true);
    const error = await signupAssociation(values);
    if (error) alert(error);
    else alert("Association registration successful!");
    setIsSubmitting(false);
  }

  const associationType = associationForm.watch("type");

  return (
    <div className="min-h-screen flex-1 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Join Kheirkom
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Create an account to start making a difference
          </p>
        </div>

        <Tabs
          defaultValue="user"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="user">Sign Up as Donor</TabsTrigger>
            <TabsTrigger value="association">
              Sign Up as Association
            </TabsTrigger>
          </TabsList>

          {/* Donor Registration Form */}
          <TabsContent value="user">
            <Card>
              <CardHeader>
                <CardTitle>Donor Registration</CardTitle>
                <CardDescription>
                  Create an account to browse causes, donate items, and share
                  your impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...donorForm}>
                  <form
                    onSubmit={donorForm.handleSubmit(onDonorSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={donorForm.control}
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
                        control={donorForm.control}
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
                      <FormField
                        control={donorForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={donorForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={donorForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john.doe@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={donorForm.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-rose-600 hover:bg-rose-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating..." : "Create Donor Account"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-rose-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Association Registration Form */}
          <TabsContent value="association">
            <Card>
              <CardHeader>
                <CardTitle>Association Registration</CardTitle>
                <CardDescription>
                  Create an account to post your organization&apos;s needs and
                  connect with donors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...associationForm}>
                  <form
                    onSubmit={associationForm.handleSubmit(onAssociationSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={associationForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Helping Hands Foundation"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={associationForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="contact@organization.org"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={associationForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={associationForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={associationForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+1 (555) 123-4567"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={associationForm.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://www.organization.org"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="md:col-span-2">
                        <FormField
                          control={associationForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="123 Main St, City, Country"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <FormField
                          control={associationForm.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organization Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select organization type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="nonprofit">
                                    Nonprofit Organization
                                  </SelectItem>
                                  <SelectItem value="charity">
                                    Registered Charity
                                  </SelectItem>
                                  <SelectItem value="educational">
                                    Educational Institution
                                  </SelectItem>
                                  <SelectItem value="religious">
                                    Religious Organization
                                  </SelectItem>
                                  <SelectItem value="school club">
                                    School Club
                                  </SelectItem>
                                  <SelectItem value="community">
                                    Community Group
                                  </SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* show custom option */}
                        {associationType === "other" && (
                          <FormField
                            control={associationForm.control}
                            name="customType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Please specify"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      {associationType !== "school club" && (
                        <FormField
                          control={associationForm.control}
                          name="registrationNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Registration Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Charity/Nonprofit Registration ID"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      <div className="md:col-span-2">
                        <FormField
                          control={associationForm.control}
                          name="about"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organization Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your organization, mission, and the communities you serve..."
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-rose-600 hover:bg-rose-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Creating..."
                        : "Create Association Account"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-rose-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
