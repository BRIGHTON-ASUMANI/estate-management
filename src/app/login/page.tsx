"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup } from "./actions";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      if (isSignup) {
        await signup(formData);
      } else {
        await login(formData);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-neutral-50">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/african-apartment.webp')",
          filter: "brightness(0.65) blur(2px)",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-900/70 to-blue-950/80"></div>

      {/* Login Card */}
      <Card className="relative w-full max-w-md bg-white/10 backdrop-blur-md shadow-xl border border-amber-200/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-amber-100">
            {isSignup ? 'Create an Account' : 'Login to Your Account'}
          </CardTitle>
          <CardDescription className="text-amber-100/80">
            {isSignup ? 'Sign up to get started' : 'Enter your email and password to access your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email" className="text-amber-100/90">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="bg-blue-950/50 text-amber-50 border-amber-200/20 focus:ring-amber-400 focus:border-amber-400 placeholder-amber-200/50"
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password" className="text-amber-100/90">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="bg-blue-950/50 text-amber-50 border-amber-200/20 focus:ring-amber-400 focus:border-amber-400 placeholder-amber-200/50"
              />
            </div>
            <div className="flex space-x-4">
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full ${
                  isSignup ? 'bg-blue-800 hover:bg-blue-900' : 'bg-amber-600 hover:bg-amber-700'
                } text-white transition-colors duration-200`}
                onClick={() => setIsSignup(false)}
              >
                {isLoading ? (
                  <span className="flex justify-center items-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v16a8 8 0 01-8-8z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Log in"
                )}
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                variant="secondary"
                className={`w-full ${
                  isSignup ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-800 hover:bg-blue-900'
                } text-white transition-colors duration-200`}
                onClick={() => setIsSignup(true)}
              >
                {isLoading ? (
                  <span className="flex justify-center items-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v16a8 8 0 01-8-8z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}