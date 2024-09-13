import { FormFooter } from '@/components/auth/login/login-form-footer';
import { LoginFormModal } from '@/components/auth/login/login-form-modal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function DialogSignIn() {
  return (
    <Dialog open={true} isRouterBack>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-1 text-center">
          <DialogTitle className="text-2xl">
            Sign in to your account
          </DialogTitle>
          <DialogDescription>
            Enter your credentials to sign in
          </DialogDescription>
        </DialogHeader>
        <LoginFormModal />
        <DialogFooter>
          <FormFooter />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
