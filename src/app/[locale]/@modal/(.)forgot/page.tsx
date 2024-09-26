import { FormFooter } from '@/components/auth/forgot/forgot-form-footer';
import { ForgotPasswordFormModal } from '@/components/auth/forgot/forgot-form-modal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return generatePageMetadata({
    description: 'Forgot password',
  });
}

export default function ForgotPasswordModal() {
  return (
    <Dialog open={true} isRouterBack>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-1 text-center">
          <DialogTitle className="text-2xl">Forgot Password</DialogTitle>
          <DialogDescription>
            Enter your email to reset your password
          </DialogDescription>
        </DialogHeader>
        <ForgotPasswordFormModal />
        <DialogFooter>
          <FormFooter />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
