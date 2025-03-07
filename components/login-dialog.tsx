"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AtSign, User, Lock, Mail, AlertCircle } from "lucide-react"

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialMode?: "login" | "signup"
}

export function LoginDialog({ open, onOpenChange, initialMode = "login" }: LoginDialogProps) {
  const [isLogin, setIsLogin] = useState(initialMode === "login")
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    confirmEmail: "",
  })

  // Update mode when dialog opens or initialMode changes
  useEffect(() => {
    if (open) {
      setIsLogin(initialMode === "login")
      // Reset form data and errors when dialog opens
      setFormData({
        name: "",
        username: "",
        email: "",
        confirmEmail: "",
        password: "",
      })
      setErrors({
        email: "",
        confirmEmail: "",
      })
    }
  }, [open, initialMode])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Validate email confirmation
    if (name === "confirmEmail" || name === "email") {
      if (name === "confirmEmail" && value !== formData.email) {
        setErrors((prev) => ({ ...prev, confirmEmail: "Emails do not match" }))
      } else if (name === "email" && formData.confirmEmail && value !== formData.confirmEmail) {
        setErrors((prev) => ({ ...prev, confirmEmail: "Emails do not match" }))
      } else {
        setErrors((prev) => ({ ...prev, confirmEmail: "" }))
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!isLogin) {
      if (formData.email !== formData.confirmEmail) {
        setErrors((prev) => ({ ...prev, confirmEmail: "Emails do not match" }))
        return
      }
    }

    // Submit form logic would go here
    console.log("Form submitted:", formData)

    // Close dialog after successful submission
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Log in" : "Sign up"}</DialogTitle>
          <DialogDescription>
            {isLogin
              ? "Enter your credentials to access your account."
              : "Create an account to start collecting cards."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {!isLogin && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="pl-8"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <AtSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="johndoe"
                      className="pl-8"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">This will be your public display name</p>
                </div>
              </>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  className="pl-8"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="grid gap-2">
                <Label htmlFor="confirmEmail">Confirm Email</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmEmail"
                    name="confirmEmail"
                    type="email"
                    value={formData.confirmEmail}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className={`pl-8 ${errors.confirmEmail ? "border-destructive" : ""}`}
                    required
                  />
                </div>
                {errors.confirmEmail && (
                  <div className="flex items-center text-xs text-destructive">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.confirmEmail}
                  </div>
                )}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-8"
                  required
                />
              </div>
              {!isLogin && <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>}
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" className="sm:w-full" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Create account" : "Log in instead"}
            </Button>
            <Button type="submit" className="sm:w-full">
              {isLogin ? "Log in" : "Sign up"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

