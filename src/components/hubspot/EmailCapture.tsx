
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface EmailCaptureProps {
  buttonText?: string;
  placeholderText?: string;
  className?: string;
  listId?: string; // HubSpot list ID for specific subscription list
  buttonIcon?: React.ReactNode;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({
  buttonText = 'Subscribe',
  placeholderText = 'Your email',
  className = '',
  listId,
  buttonIcon,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would post to a HubSpot form endpoint or your backend
      // For now, we'll just simulate a successful submission
      
      // Track the subscription in HubSpot analytics if available
      if (window._hsq) {
        window._hsq.push(['identify', {
          email: email
        }]);
        window._hsq.push(['trackEvent', {
          id: 'email_newsletter_subscription'
        }]);
      }
      
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex space-x-2 ${className}`}>
      <Input
        type="email"
        placeholder={placeholderText}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        disabled={isSubmitting}
        required
      />
      <Button 
        type="submit" 
        className="bg-prometheus-orange hover:bg-prometheus-orange/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : buttonText}
        {buttonIcon && !isSubmitting && buttonIcon}
      </Button>
    </form>
  );
};

export default EmailCapture;
