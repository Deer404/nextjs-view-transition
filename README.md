# Nextjs-view-transition

## Introduction

This repository contains a modified version of the next-view-transitions library, designed to enable Next.js applications to use the View Transitions API in App Router. our version builds on the good foundation provided by the original library, with some changes, thanks to the original repository's contributions 🙏
## Acknowledgment

This project is based on and inspired by the [next-view-transitions](https://github.com/shuding/next-view-transitions) library created by Shu Ding. We extend our heartfelt gratitude to Shu Ding and all contributors to the original project for their innovative work and for making it available under the MIT license. Their efforts have been instrumental in the development of this modified version.

## Original Repository

The original next-view-transitions library can be found at:
[https://github.com/shuding/next-view-transitions](https://github.com/shuding/next-view-transitions)

We strongly encourage users to check out the original repository to understand the foundational concepts and to support the primary project.


## Installation

To install this modified version of next-view-transitions, use your preferred package manager. For example:

```bash
npm install nextjs-view-transition
# or
yarn add nextjs-view-transition
# or
pnpm install nextjs-view-transition
```

## Usage

Wrap your content with the `<ViewTransitions>` component inside the layout file:

```jsx
import { ViewTransitions } from 'nextjs-view-transition'

export default function Layout({ children }) {
  return (
    <ViewTransitions>
      <html lang='en'>
        <body>
          {children}
        </body>
      </html>
    </ViewTransitions>
  )
}
```

Then, use the `<TransitionLink>` component for links that need to trigger a view transition:

```jsx
import { TransitionLink } from "nextjs-view-transition";

export default function Page() {
  return (
    <div>
      <TransitionLink href='/book'>Go to book page</TransitionLink>
    </div>
  )
}
```

## License
MIT License

Copyright (c) 2024 Deer404

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.