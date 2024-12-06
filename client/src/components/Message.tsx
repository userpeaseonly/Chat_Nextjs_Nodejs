export default function Message({ email, message, owner }: { email: string; message: string; owner: boolean }) {
    return (
      <article
        className={`border-2 w-1/2 flex flex-col p-2 rounded-lg ${
          owner ? 'self-end bg-green-800 text-white ml-auto' : 'bg-gray-200'
        }`}
      >
        <span
          className={`text-sm ${owner ? 'self-end text-white' : 'text-gray-500'}`}
        >
            {email}
        </span>
        <p className={`text-lg ${owner ? 'text-white' : 'text-black'}`}>
            {message}
        </p>
      </article>
    );
  }
  