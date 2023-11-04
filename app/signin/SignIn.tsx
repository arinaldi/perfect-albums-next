'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useServerAction } from 'hooks/useServerAction';
import AppLayout from 'components/AppLayout';
import Input from 'components/Input';
import PasswordInput from 'components/PasswordInput';
import PrimaryButton from 'components/PrimaryButton';
import { signIn } from './actions';
import { signInSchema, type SignInInput } from './schema';

export default function SignIn() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });
  const { isSubmitting, onSubmit } = useServerAction({
    callbacks: [],
    handleSubmit,
    submitFn: signIn,
  });

  return (
    <AppLayout className="max-w-sm" title="Sign In">
      <form onSubmit={onSubmit}>
        <fieldset>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <Input
                error={errors.email}
                id="email"
                type="email"
                wrapperClassName="mt-4"
                {...register('email')}
              />
              <PasswordInput
                error={errors.password}
                wrapperClassName="mt-4"
                {...register('password')}
              />
            </div>
          </div>
          <div className="mt-6 flex items-center">
            <PrimaryButton isSubmitting={isSubmitting} />
          </div>
        </fieldset>
      </form>
    </AppLayout>
  );
}
