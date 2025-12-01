"use client";

import {
  AlertTriangle,
  Crown,
  ExternalLink,
  Loader2,
  Lock,
  Trash2,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

interface SubscriptionData {
  hasSubscription: boolean;
  status?: string;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  monthlyCredits?: number;
  creditsUsed?: number;
}

interface UserData {
  name: string;
  email: string;
  image?: string;
  emailVerified: boolean;
}

export default function SettingsPage() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(
    null,
  );
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  // Profile update states
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Password change states
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Account deletion states
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [creditsRes, sessionRes] = await Promise.all([
          fetch("/api/user/credits"),
          authClient.getSession(),
        ]);

        const creditsData = await creditsRes.json();
        setCredits(creditsData.credits);
        setSubscription({
          hasSubscription: creditsData.hasSubscription,
          status: creditsData.subscriptionStatus,
          currentPeriodEnd: creditsData.currentPeriodEnd,
          monthlyCredits: creditsData.monthlyCredits,
          creditsUsed: creditsData.creditsUsed,
          cancelAtPeriodEnd: creditsData.cancelAtPeriodEnd,
        });

        if (sessionRes.data?.user) {
          const userData = {
            name: sessionRes.data.user.name,
            email: sessionRes.data.user.email,
            image: sessionRes.data.user.image || undefined,
            emailVerified: sessionRes.data.user.emailVerified,
          };
          setUser(userData);
          setProfileName(userData.name);
          setProfileImage(userData.image || "");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleManageSubscription = async () => {
    try {
      await authClient.customer.portal();
    } catch (error) {
      console.error("Failed to open customer portal:", error);
      toast.error("Failed to open billing portal");
    }
  };

  const handleUpgrade = async () => {
    try {
      await authClient.checkout({ slug: "pro" });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout");
    }
  };

  const handleUpdateProfile = async () => {
    setIsUpdatingProfile(true);
    try {
      const { error } = await authClient.updateUser({
        name: profileName,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
        return;
      }

      setUser((prev) => (prev ? { ...prev, name: profileName } : null));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsChangingPassword(true);
    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || "Failed to change password");
        return;
      }

      toast.success("Password changed successfully");
      setShowPasswordDialog(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Change password error:", error);
      toast.error("Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error("Please enter your password to confirm");
      return;
    }

    setIsDeletingAccount(true);
    try {
      const { error } = await authClient.deleteUser({
        password: deletePassword,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Failed to send verification email");
        return;
      }

      toast.success(
        "Verification email sent. Check your inbox and click the link to permanently delete your account.",
      );
      setShowDeleteDialog(false);
      setDeletePassword("");
    } catch (error) {
      console.error("Delete account error:", error);
      toast.error("Failed to send verification email");
    } finally {
      setIsDeletingAccount(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const isProUser =
    subscription?.hasSubscription && subscription?.status === "active";

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account, subscription, and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Profile</CardTitle>
          </div>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-start gap-3">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileImage} alt={profileName} />
              <AvatarFallback className="text-2xl font-semibold">
                {profileName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
          </div>

          <Button
            onClick={handleUpdateProfile}
            disabled={isUpdatingProfile || profileName === user?.name}
          >
            {isUpdatingProfile ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Profile"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <CardTitle>Password</CardTitle>
          </div>
          <CardDescription>Change your password</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => setShowPasswordDialog(true)}>
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* Subscription Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isProUser ? (
                <Crown className="h-5 w-5 text-yellow-500" />
              ) : (
                <Zap className="h-5 w-5 text-primary" />
              )}
              <CardTitle>{isProUser ? "Pro Plan" : "Free Plan"}</CardTitle>
            </div>
            {isProUser ? (
              <Button onClick={handleManageSubscription} variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                Manage Subscription
              </Button>
            ) : (
              <Button onClick={handleUpgrade}>Upgrade to Pro</Button>
            )}
          </div>
          <CardDescription>
            {isProUser
              ? "You're on the Pro plan with premium features"
              : "You're on the Free plan"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">
                Credits Available
              </p>
              <p className="text-2xl font-bold">{credits}</p>
            </div>
            {isProUser && subscription && (
              <>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    Credits Used
                  </p>
                  <p className="text-2xl font-bold">
                    {subscription.creditsUsed} / {subscription.monthlyCredits}
                  </p>
                </div>
                <div className="p-4 border rounded-lg col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">
                    Next Billing Date
                  </p>
                  <p className="text-lg font-medium">
                    {subscription.currentPeriodEnd
                      ? new Date(
                          subscription.currentPeriodEnd,
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                  {subscription.cancelAtPeriodEnd && (
                    <p className="text-sm text-destructive mt-2">
                      Your subscription will be canceled on this date
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {!isProUser && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Upgrade to Pro for:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  20 credits per month
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Faster staging & priority queue
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  No watermarks
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Unlimited history & downloads
                </li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </div>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            This will send a verification email. Your account will only be
            deleted after you click the confirmation link.
          </p>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Request Account Deletion
          </Button>
        </CardContent>
      </Card>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPasswordDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleChangePassword}
              disabled={isChangingPassword}
            >
              {isChangingPassword ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Changing...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Request Account Deletion?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                We'll send a verification email to confirm this request. Your
                account will only be deleted after you click the confirmation
                link in the email.
              </p>
              <p className="font-medium text-destructive">
                Once confirmed, this action cannot be undone. All your data will
                be permanently removed.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 py-4">
            <Label htmlFor="deletePassword">
              Enter your password to send verification email
            </Label>
            <Input
              id="deletePassword"
              type="password"
              placeholder="Your password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isDeletingAccount}
            >
              {isDeletingAccount ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Verification Email"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
