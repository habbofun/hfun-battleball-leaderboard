'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { HobbaGroup } from '@prisma/client';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  addStaffMember,
  removeStaffMember,
} from '@/server/actions/habbo/manage-staff';

const addStaffSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  hobbaGroup: z.nativeEnum(HobbaGroup),
});

export function StaffManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [staffIdToRemove, setStaffIdToRemove] = useState('');

  const form = useForm<z.infer<typeof addStaffSchema>>({
    resolver: zodResolver(addStaffSchema),
    defaultValues: {
      name: '',
      hobbaGroup: HobbaGroup.SILVER,
    },
  });

  const onSubmit = async (values: z.infer<typeof addStaffSchema>) => {
    const result = await addStaffMember(values.name, values.hobbaGroup);
    if (result.success) {
      toast.success('Staff member added successfully');
      setIsAddModalOpen(false);
      form.reset();
    } else {
      toast.error(result.error || 'Failed to add staff member');
    }
  };

  const handleRemoveStaff = async () => {
    if (!staffIdToRemove) return;
    const result = await removeStaffMember(staffIdToRemove);
    if (result.success) {
      toast.success('Staff member removed successfully');
      setIsRemoveModalOpen(false);
      setStaffIdToRemove('');
    } else {
      toast.error(result.error || 'Failed to remove staff member');
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Staff Management</h2>
        <div className="flex space-x-4">
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>Add Staff Member</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Habbo Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hobbaGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hobba Group</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={HobbaGroup.GOLD}>
                              Gold
                            </SelectItem>
                            <SelectItem value={HobbaGroup.SILVER}>
                              Silver
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Add Staff Member</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog open={isRemoveModalOpen} onOpenChange={setIsRemoveModalOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Remove Staff Member</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Remove Staff Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Enter staff member ID"
                  value={staffIdToRemove}
                  onChange={(e) => setStaffIdToRemove(e.target.value)}
                />
                <Button onClick={handleRemoveStaff} variant="destructive">
                  Remove Staff Member
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
