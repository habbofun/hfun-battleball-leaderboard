import { Button } from '@/components/ui/button';

export const AdminToolbar = () => {
  return (
    <div className="mt-8 w-full max-w-2xl rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Admin Toolbar</h2>
      <div className="flex justify-center gap-4">
        <Button variant="outline">Add Hobba</Button>
        <Button variant="outline">Edit Hobba</Button>
        <Button variant="destructive">Delete Hobba</Button>
      </div>
    </div>
  );
};
