import { FormFooter } from '@/components/auth/register/register-form-footer';
import { RegisterFormModal } from '@/components/auth/register/register-form-modal';
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
    description: 'Sign up',
  });
}

export default function DialogDemo() {
  return (
    <Dialog open={true} isRouterBack>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-1 text-center w-full flex justify-center">
          <DialogTitle className="text-2xl ">Create an account</DialogTitle>
          <DialogDescription>Enter your details to register</DialogDescription>
        </DialogHeader>
        <RegisterFormModal />
        <DialogFooter>
          <FormFooter />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
