interface TestimonialProps {
    thumbnail: string;
    text: string;
    author: string;
  }
  
  const Testimonial: React.FC<TestimonialProps> = ({ thumbnail, text, author }) => {
    return (
      <div className='bg-white p-4'>
        <img
          src={thumbnail}
          alt='Thumbnail'
          className='w-20 h-20 rounded-full mr-4'
        />
        <h2 className='text-2xl mt-4'>{text}</h2>
        <h4 className='text-lg text-right mt-4'>{author}</h4>
      </div>
    );
  };
  
  interface TestimonialGridProps {
    testimonials: {
      thumbnail: string;
      text: string;
      author: string;
    }[];
  }
  
  const TestimonialGrid: React.FC<TestimonialGridProps> = ({ testimonials }) => {
    return (
      <div className='grid p-8 mt-20 grid-cols-1 md:grid-cols-2 gap-4 w-full'>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={`${index >= 2 ? 'hidden md:block' : ''}`}>
            <Testimonial
              thumbnail={testimonial.thumbnail}
              text={testimonial.text}
              author={testimonial.author}
            />
          </div>
        ))}
      </div>
    );
  };
  
  export default TestimonialGrid;
  