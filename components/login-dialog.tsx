"use client"

import { useState } from "react"
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

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [isLogin, setIsLogin] = useState(true)

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
        <div className="grid gap-4 py-4">
          {!isLogin && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@email.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="sm:w-full" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create account" : "Log in instead"}
          </Button>
          <Button type="submit" className="sm:w-full">
            {isLogin ? "Log in" : "Sign up"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

