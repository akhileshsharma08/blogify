import Link from "next/link";

// setTimeout(function(){
//   window.location.reload();
// }, 5000);

async function fetchBlogs() {
  const res = await fetch("http://localhost:3000/api/blog", 
  {
    next: {
      revalidate:5,
    },
  });
  const data = await res.json();
  return data.posts;
}

export default async function Home() {
  const posts = await fetchBlogs();
  console.log(posts);
  return (
    <main className="bg-slate-900  w-full h-screen">
      <p>{posts.title}</p>
      <div className="maindiv py-8">
        <div className="container mx-auto">
          <h1 className="text-center  font-bold text-4xl bg-slate-700 text-white my-2 pb-2">
            Blogify
          </h1>
        </div>
        <p className="text-gray-400 text-center text-bold text-xl capitalize mb-4">
          excel the passion of writting{" "}
        </p>

<p  className="text-center my-2 text-black bg-yellow-500 mx-44">please Refresh the page after 5 seconds for Latest Update </p>
        <div className=" flex justify-center items-center mb-4 font-semibold">
          <div className="btndiv my-2">
            <Link
              href={"/blog/add"}
              className="bg-zinc-100 text-slate-900 px-8 py-2 rounded"
            >
              Add Blog 🚀
            </Link>
          </div>
        </div>

        {!posts ? (<h1> No Blog found ! Add A Blog 👆🏼</h1>):(posts.map((post: any) => (
          <div
            className="container  mx-auto w-3/4 border-2 rounded-lg mb-2"
            key={post.id}
          >
            <div className="postsbox bg-zinc-100 p-2 text-slate-900 flex justify-between items-center">
              <div>
                <h2 className="font-bold capitalize text-2xl">{post.title}</h2>
                <p className="text-slate-600 font-semibold">
                  {new Date(post.date).toDateString()}
                </p>
                <p className="capitalize">{post.description}</p>
              </div>

              <div>
                <Link
                  href={`/blog/edit/${post.id}`}
                  className="bg-slate-900 rounded-lg text-lg px-4 py-2 hover:bg-slate-950 text-white"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        )))}
      </div>
    </main>
  );
}
