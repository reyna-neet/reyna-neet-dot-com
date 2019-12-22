---
title: JAMstack Blog Tutorial
date: 17-12-2019
---

# How to Waste Your Time Building a Worse Version of Jekyll 

## Introduction

If this is your first time hearing about the JAMstack, 
you should check out the description at [jamstack.org](https://jamstack.org).

I'll admit to being skeptical about the JAMstack's ability to revolutionize web development.
Don't get me wrong —
I've loved the time I've spent working with it so far over the past month or so,
and the theory behind it seems very sound —
I just find it hard to see huge companies putting in the work to pivot towards it if they haven't already been working towards microservice-based architectures.
I trust [jamstack.org](https://jamstack.org) when it goes over the potential benefits,
but without seeing numbers,
I'm hesitant to imagine companies taking big steps towards replacing their 'monoliths,'
especially if that would mean additional work or training for non-developers.

Nevertheless, 
there are many use cases that are not large corporations with existing functional sites,
and if you're starting from scratch in 2019,
you may as well use the new hotness.
I may be skeptical of its ability to replace traditional server-bound sites,
but I don't think it'll be going away anytime soon,
either.
After all,
working with static sites opens up the opportunity to use some of the background noise legacy features of the web ecosystem the way they were initially intended.
This website, for example, stores its text files in — get this — the file system.
No database necessary.
This is,
of course,
much better for my relatively simple personal use case than pretty much any business case,
but it's not too hard to imagine what a team of engineers could implement that would outshine what I've done here.

In fact,
you don't have to imagine.
[Jekyll](https://jekyllrb.com/) already exists,
and is probably a much better choice than trying to build something from scratch.
But if,
like me,
you want to work a little bit more under-the-hood to get a better grasp of how things function
(and add some bullets to your entry-level developer resume),
keep reading for a tour of my process of building a statically-rendered blog site using Nuxt.js.

## The Plan

Our goal is simple enough: 
we want a statically-rendered application that we can host on providers like [Netlify](https://netlify.com) for free,
i.e. without using a database or any backend code that doesn't fit into our build script.
Further,
we want to be able to make a new post with a single Git commit,
and we want to maintain separation of concerns between the text content of the blog post and the structure of the page within the code.

For mine,
I decided to use [Vue.js](https://vuejs.org) via [Nuxt.js](https://nuxtjs.org), 
a framework for building web applications transparently inspired by React's Next.js.
I went with Vue for this project because its excellent documentation and similarity to traditional HTML/CSS/Javascript development make it a good front-end framework for beginners,
which I am,
but I imagine a similar idea can be implemented in React using Next,
or in Angular using whatever similar service is available for Angular.
You'll also need to pick up the [frontmatter-markdown-loader](https://www.npmjs.com/package/frontmatter-markdown-loader),
since we're not going to build Jekyll *entirely* from scratch after all,
and a snack,
because if you have my luck,
you found this tutorial searching for help with a problem in a very similar project,
and it's going to turn out that I've bypassed the problem in a way you're not satisfied with.

## Getting Started

I used create-nuxt-app via NPM to get started.
Make sure you choose Universal mode when given the choice between Universal and SPA.
If you want to match me specifically,
make the following selections:
+ use the default Nuxt server
+ do not add a UI framework
+ add Jest, then decide not to worry about testing this time (and regret it later)
+ Universal mode, as mentioned above
+ Add axios, as you're going to connect to an API eventually
+ Add ESLint and Prettier in an attempt to learn them, 
get errors that keep the site from building, 
and decide to remove them instead of troubleshooting 
in an attempt to get the site up more quickly

Obviously, 
I wouldn't recommend doing some of those things,
but I can't go back and change how the development cycle played out.
Luckily,
the code here is pretty simple,
so you should be able to get it working without unit testing,
linting,
or auto-formatting,
if you decide to make every mistake that I made.
I'm going to leave layout specifics and CSS as an exercise for the reader,
as I don't think mine are good for most purposes.
If you really like them for some reason,
feel free to crib them from [Github](https://github.com/reyna-neet/reyna-neet-dot-com).

Regardless of your choices,
with the directory structure laid out,
it's time to start setting up some of the specifics.
Change index.vue to something more fitting for your brand,
add a nuxt-link to your-site/blog,
and add a blog directory to Pages/ with an index.vue.
Now we have a landing page for your website,
that links to what will be your blog index.
Now add a posts/ directory to assets/,
and copy whatever texts you like into a few .md files for testing
(and if you're me, leaving up in production for a few weeks).

## Creating the Index

With the test files in place, we can start with the easiest piece of the code:
creating a your-site/blog page that links to all blog posts,
and automatically updates when a new one is added.
The file in question is pages/blog/index.vue.
Simply put,
the page is going to examine the contents of the assets/posts directory,
and create a link that goes to your-site/blog/filename for each file.
Here's the code:

        data: function() {
          return {
            posts: []
          };
        },

        mounted() {
          this.importMd(require.context('../../assets/posts/', true, /\.md$/));
        },

        methods: {
          importMd(f) {
             f.keys().forEach(key => (this.posts.push({ fileName: '/blog/' + key.split(".")[1].substr(1), 
                                                       title: f(key).attributes.title })));
          }
        },

This page uses Webpack's require.context function,
which returns an object containing the files in a directory
(loaded however Webpack is instructed to do so),
accessible via keys which are strings containing the file path.
importMd(f) iterates through the list of keys,
adding objects to the posts array containing the desired route paths
and the 'title' attribute from each posts frontmatter.
From here, a v-for list in the template creates nuxt-links for each post,
creating a functioning index.

Telling a front-end page to directly access the filesystem like this should feel strange,
but it isn't an issue here.
Static site generation means that the code that's actually sent to the user's browser
won't be running this function.
Rather,
it's going to be run at build time:
we effectively do have access to back-end code,
as long as it only needs to run once for each version of the site.

## Loading Blog Posts

If you decided to skip ahead and test your new index using npm run dev,
you've probably discovered that it doesn't actually work just yet:
you can get to your-site/blog/post-name,
but there's nothing there.
Of course there's nothing there; we haven't put anything there yet.
Let's fix that, by adding the following to pages/blog/\_post.vue:

        <template>
          <div class="container">
            <client-only placeholder="Loading...">
              <BlogContent :fileName=$route.params.post />
            </client-only>
          </div>
        </template>

        <script>
        import BlogContent from '../../components/BlogContent.vue'
        import '~/assets/style/blog-post.scss'

        export default {
          components: {
            BlogContent
          },
          transition: 'fade'
        }
        </script>

So now the page gets the name of the file from the route,
then sends that to a BlogContent compone — hey, wait.
What is a BlogContent component?
This is the part that I had the most trouble with on my own,
and to be honest,
I'm still not entirely sure why I had to do what I did.
I got the idea for this solution from Marina Aisa's similar project
[here](https://github.com/marinaaisa/nuxt-markdown-blog-starter).
Essentially,
the markdown loader wasn't loading markdown files as Vue components on their own.
They had to be included in another component,
which couldn't be the Page itself.
This seems to be related to an interaction between Nuxt and Webpack,
as [the official example](https://github.com/hmsk/frontmatter-markdown-loader-vue-sample)
doesn't have the same problem or solution.
Regardless, create a BlogContent.vue file in Components, and fill it with this:

        <template>
        <div class="blog-post">
          <h1 class="title"> {{ title }} </h1>
          <div class="blog-text">
            <component :is="dynamicComponent" />
          </div>
        </div>
        </template>

        <script>
        export default {
          props: ['fileName'],
          data () {
            return {
              title: 'default', //shouldn't ever see this
              dynamicComponent: null
            }
          },
        
          methods: {
            createMdTitle(context) {
              this.title = context('./' + this.fileName + '.md').attributes.title
            },
            createMdComponent(context) {
              this.dynamicComponent = context('./' + this.fileName + '.md').vue.component
            }
          },
        
          mounted() {
            var md = require.context('../assets/posts/', true, /\.md$/);
            this.createMdComponent(md)
            this.createMdTitle(md)
          }
        }
        </script>

This component itself consists of a title,
loaded from the markdown file's frontmatter,
and a Vue component,
created by frontmatter-markdown-loader,
that contains the markdown file's actual contents compiled to HTML.
Of note,
this file also uses require.context,
but for something closer to its intended purpose:
loading a file based on dynamic information.
In this case,
if we tried to just load the file based on the fileName prop directly,
the page would fail to build
(as it did when I was doing the coding myself)
because other methods such as import and require on its own can only take string literals,
not variables such as props.
Luckily for us,
using require.context to get the contents of the directory and then using our variable
to resolve the context to a file DOES allow us to use a variable,
so our design isn't dead in the water.

At this point,
your tests using npm run dev are looking good,
so you might think you're ready to deploy your statically-generated site to your favorite CDN-based 'host.'
Go ahead.
I'll wait.

## Fixing the Dynamic Routes

And it doesn't work.
Not yet.
Earlier,
when we made pages/blog/\_post.vue,
we created a dynamic route,
which works fine when the page is running as a single-page application on your local machine.
Static site generation,
however,
ignores dynamic routes.
They must be declared manually,
in nuxt.config.js,
with this block in the export section:

        generate: {
          routes: [
            'blog/title1',
            'blog/title2',
            'blog/etc'
          ] 
        }

This will function just fine,
but it's an extra step every time you want to publish a post:
you have to add the route manually to nuxt.config.js.
Instead,
we want the routes to generate automatically at build time.
Replace the route array with this function:

          routes (callback) { 
            var dirList = [];
            fs.readdir('./assets/posts', (err, files) => {
              if (err){
                console.log('\n' + err + '\n')
              }
              console.log('\n' + files + '\n')
              files.forEach(file => {
                dirList.push('/blog/' + file.split('.')[0])
              })
              callback(null, dirList)
            })
          }

This absolute mess is a callback function,
a specialty of Node.js used for functions that need to run asynchronously
(in this case,
to keep the potentially very long runtime of this operation from gumming up site generation).
This is the first callback function I've written,
so I don't want to go into too much detail I don't really understand about how they work,
but suffice to say that this is using Node.js' fs module to get a list of files in the
posts directory,
then pushing a route derived from string-manipulating that file's name into an array
that's eventually returned as our array of routes.
This gives us routing that's as dynamic as we need for a statically-generated site,
in that we no longer have to manually declare routes for each new post.

## In Conclusion

After working with the JAMstack on this project,
I can definitely see where the claims of developer-friendliness are coming from.
Though I did run into trouble at a few points,
that's to be expected from a developer who's still fairly green,
and I imagine that a more seasoned programmer would have zero trouble setting up a similar system.
Even for me,
getting the blog software up and running was relatively quick and painless,
save for the issues with the frontmatter-markdown-loader mentioned above.

As far as next steps for this website,
I have a few ideas.
I'd like to have an About page separate from the blog,
with both text talking about who I am and a nice picture,
possibly harking back to my original website —
a picture of my face where my eyes appeared to track the cursor around the screen.
I'm also trying to think of a good way to separate my text content based on audience.
This post is a tech tutorial,
but I think my next post will be a piece of cultural critique,
and I'd like to have readers looking for one of those things not have to sift
through too much of the other.
Finally,
I want to break into API development with something I can use for this site.
At the time of this writing,
I'm leaning towards a headless API for storing recipes.

If you've made it this far,
good luck with your own endeavors —
whatever they may be.
Feel free to use your browser's back button to find links to my Twitter, Github, and LinkedIn,
and have a wonderful holiday (if you haven't already).
