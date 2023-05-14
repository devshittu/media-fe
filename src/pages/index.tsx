import Head from 'next/head';
// import Image from 'next/image'
// import { Inter } from 'next/font/google';
// import styles from '@/styles/Home.module.css';
import { Seo } from '@/components/seo';
import { Button } from '@/components/button';
import { FieldError, InputField } from '@/components/form';
import { useState } from 'react';
import Link from 'next/link';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<FieldError | null>(null);

  const handleEmailChange = (value: string) => {
    setEmail(value);

    // Example validation
    if (value.trim() === '') {
      setEmailError({ message: 'Email is required' });
    } else {
      setEmailError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Example form submission
    if (!emailError && email.trim() !== '') {
      // Perform further actions, such as API requests or form submission
      console.log('Form submitted');
    }
  };

  const mailIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-mail"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
  return (
    <>
      <Seo title="New App" />
      <main>
        <h1>Hello Media</h1>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Button
          type="info"
          size="small"
          outlined
          badge="New"
          icon={mailIcon}
          loading
        >
          Newon
        </Button>

        <Button type="success" outlined badge="New">
          Newon
        </Button>
        <Button
          type="warning"
          size="large"
          outlined
          badge="New"
          badgeType="danger"
        >
          Newon
        </Button>
        <Button type="primary" outlined icon={mailIcon}>
          Hello world!
        </Button>
        <Button
          type="danger"
          size="large"
          icon={mailIcon}
          iconPosition="right"
          outlined
          className=" text-2xl "
        >
          Newon
        </Button>
        <Button
          type="info"
          size="large"
          loading
          className=" text-2xl inline-flex"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
          Loading...
        </Button>
        <form onSubmit={handleSubmit}>
          <InputField
            name="Email"
            error={emailError}
            placeholder="@example.com"
          />
          <InputField
            type="email"
            name="EmailField"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
          />

          <Button nativeType="submit">Submit</Button>
        </form>
        <h1 className="text-3xl font-bold underline bg-secondary">
          Hello world!
        </h1>
        <div className="max-w-2xl mx-auto bg-white p-16">
          <form>
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
              <InputField
                type="email"
                name="EmailField"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
              />
              <InputField
                type="email"
                name="Small Field"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                size="small"
              />

              <InputField
                type="email"
                name="Base Field"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
              />
            </div>

            <div className="mb-6"></div>
            <InputField
              type="email"
              name="EmailField"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              size="large"
            />
            <InputField
              type="email"
              name="Small Field"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              size="small"
            />

            <InputField
              type="email"
              name="Base Field"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
            />
            <InputField
              type="password"
              name="Password"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
            />
            <InputField
              type="password"
              name="Confirm Password"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
            />
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                I agree with the{' '}
                <Link
                  href="/"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </Link>
                .
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>

          <p className="mt-5">
            These input field components is part of a larger, open-source
            library of Tailwind CSS components. Learn more by going to the
            official{' '}
            <a
              className="text-blue-600 hover:underline"
              href="https://flowbite.com/docs/getting-started/introduction/"
              target="_blank"
            >
              Flowbite Documentation
            </a>
            .
          </p>
        </div>

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Default
        </button>
        <button
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Alternative
        </button>
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Dark
        </button>
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Light
        </button>
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Green
        </button>
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Red
        </button>
        <button
          type="button"
          className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
        >
          Yellow
        </button>
        <button
          type="button"
          className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          Purple
        </button>
      </main>
    </>
  );
}
