'use client';

import * as React from 'react';
import { MinusIcon } from 'lucide-react';
import { OTPInput, SlotProps } from 'input-otp';

import { cn } from '@/lib/utils';

const InputOTP = ({
  className,
  ...props
}: React.ComponentProps<typeof OTPInput>) => (
  <OTPInput
    containerClassName={cn('flex items-center gap-2', className)}
    {...props}
  />
);
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div className={cn('flex items-center', className)} {...props} />
);
InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot = ({
  char,
  hasFakeCaret,
  isActive,
  className,
  ...props
}: SlotProps & React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'border-input relative flex size-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all first:rounded-l-md first:border-l last:rounded-r-md',
        isActive && 'ring-ring z-10 ring-1',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
};
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = (props: React.ComponentProps<'div'>) => (
  <div role="separator" {...props}>
    <MinusIcon />
  </div>
);
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
