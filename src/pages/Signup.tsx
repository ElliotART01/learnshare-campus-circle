import { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/i18n/index";

const majorsList = [
  "Engineering",
  "Computer Science",
  "Business Administration",
  "Medicine",
  "Pharmacy",
  "Dentistry",
  "Nursing",
  "Law",
  "Education",
  "Science",
  "Humanities",
  "Applied Medical Sciences",
  "Sharia",
  "Languages & Translation",
  "Arts & Literature",
  "Other"
];

const genderList = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" }
];

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Confirm password is required." }),
  major: z.string().min(2, { message: "Please select your major." }),
  age: z
    .union([
      z.string().length(0), // optional, empty string
      z.string().regex(/^(1[89]|[2-9][0-9]|100)$/, {
        message: "Age must be a number between 18 and 100",
      }),
    ])
    .optional(),
  gender: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
}).refine((data) => data.major, {
  message: "Please select a major.",
  path: ["major"]
}).refine((data) => data.gender, {
  message: "Please select a gender.",
  path: ["gender"]
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();

  const majorsList = t(language, "signup.majors");
  const genderList = t(language, "signup.genderList");

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      major: "",
      age: "",
      gender: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      await signup(
        data.name,
        data.email,
        data.password,
        data.major,
        data.age && data.age !== "" ? Number(data.age) : undefined,
        data.gender as any
      );
      toast({
        title: "Account created",
        description: "Welcome to Campus Circle!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "An error occurred during sign up",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-background ${language === "ar" ? "rtl" : ""}`}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mt-8">
          <Card>
            <CardHeader>
              <CardTitle>{t(language, "signup.title")}</CardTitle>
              <CardDescription>
                {t(language, "signup.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t(language, "signup.name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t(language, "signup.namePlaceholder")} {...field} />
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
                        <FormLabel>{t(language, "signup.email")}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t(language, "signup.emailPlaceholder")}
                            type="email" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="major"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t(language, "signup.major")}</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t(language, "signup.majorPlaceholder")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {majorsList.map((major: string, idx: number) => (
                              <SelectItem value={major} key={idx}>
                                {major}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t(language, "signup.age")}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t(language, "signup.agePlaceholder")}
                            type="number"
                            min={18}
                            max={100}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t(language, "signup.gender")}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t(language, "signup.genderPlaceholder")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genderList.map((gender: any) => (
                              <SelectItem value={gender.value} key={gender.value}>
                                {gender.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t(language, "signup.password")}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="••••••••" 
                            type="password" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t(language, "signup.confirmPassword")}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="••••••••" 
                            type="password" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "..." : t(language, "signup.submit")}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                {t(language, "signup.alreadyHaveAccount")}{" "}
                <Link to="/login" className="text-primary hover:underline">
                  {t(language, "signup.login")}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Signup;
