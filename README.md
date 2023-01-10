# test-pwa
pwa hello world, for training

This example is just the barebones of PWA, with minimal configurations for manifest.json and service worker.

How to run it on a web https server ?
-> There are a few ways to run a PWA on an HTTPS web server, depending on your specific needs and technical capabilities. Here are a few common options:
option 1 : Use a free hosting service: There are several free hosting services, such as GitHub Pages and GitLab Pages, that allow you to host a PWA for free on an HTTPS web server. These services are easy to use and don't require any configuration, but they have some limitations in terms of storage, custom domains, and the ability to use server-side code.

GitHub Pages is a free service offered by GitHub that allows you to host a website directly from a GitHub repository. To use GitHub Pages to host your PWA, you will need to:

- Create a new repository on GitHub: Go to GitHub and create a new repository for your PWA. You can choose a name that is appropriate for your project, and make sure the repository is set to public.

- Upload your PWA files to the repository: Once the repository is created, you can upload your PWA files (HTML, CSS, JavaScript, images, etc.) to the repository by using the web interface or by using a Git client.

- Enable GitHub Pages: In your repository settings, find the GitHub Pages section, and select the branch that you want to use as the source for GitHub Pages. The default is the master branch but you can choose to use other branches like gh-pages.

- Wait for GitHub to build your PWA: After you enable GitHub Pages, GitHub will automatically build your PWA and make it available at a URL in the format of https://<username>.github.io/<repository>/. You can find this link in your repository settings under the GitHub Pages section.

- You should note that, by default, GitHub Pages uses Jekyll, which is a static site generator. You can ignore this if you are not using Jekyll.

- If you want to use a custom domain for your PWA, you can do that by adding a CNAME file in the root of your repository and configuring the DNS settings of your custom domain accordingly.
