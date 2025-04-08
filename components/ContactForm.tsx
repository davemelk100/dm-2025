import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formElements = form.elements as typeof form.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
      message: HTMLTextAreaElement;
    };

    setFormData({
      name: formElements.name.value,
      email: formElements.email.value,
      message: formElements.message.value,
    });
    
    setShowDialog(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    setShowDialog(false);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Input
            name="name"
            type="text"
            placeholder="Your name"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <Input
            name="email"
            type="email"
            placeholder="Your email"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <Textarea
            name="message"
            placeholder="Your message"
            className="min-h-[150px]"
            required
            disabled={isSubmitting}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Message</DialogTitle>
            <DialogDescription>
              Are you sure you want to send this message?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <p className="mt-1 text-sm text-muted-foreground">{formData.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="mt-1 text-sm text-muted-foreground">{formData.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">{formData.message}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={handleConfirmSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Confirm & Send'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}