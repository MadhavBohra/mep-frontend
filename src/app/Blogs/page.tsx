'use client';


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LandingHeader from '../components/LandingHeader/Header';
import styles from './Blogs.module.css';
import BlogCard from '../components/BlogCard/BlogCard';

interface Blog {
  id: number;
  title: string;
  content: string;
  formattedContent: string;
  images: string[];
  link: string;
}



const formatContent = (content: string) => {
  return content.replace(/\\n/g, '\n');
};

const Blogs: React.FC = () => {
  // empty blogs list
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [expandedBlogId, setExpandedBlogId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/blogs.json')
      .then(response => response.json())
      .then(data => {
        const formattedBlogs = data.map((blog: Blog) => ({
          ...blog,
          formattedContent: formatContent(blog.content)
        }));
        setBlogs(formattedBlogs);
      })
      .catch(error => console.error('Error fetching blogs data:', error));
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedBlogId(prev => (prev === id ? null : id));
  };

  console.log(blogs);




  return (
    <>
    {/* <div className={styles.background}>
      <LandingHeader />
      <div className="blogs-container">
        {blogs.map((blog, index) => (
          <div
            key={blog.id}
            className={`blog-box ${expandedBlogId === blog.id ? 'expanded' : ''} ${index % 2 === 0 ? 'even' : 'odd'}`}
            onClick={() => toggleExpand(blog.id)}
          >
            {index % 2 === 0 ? (
              <>
                {blog.images.length > 0 && (
                  <img src={blog.images[0]} alt={blog.title} className="blog-image" />
                )}
                <div className="content">
                  <h2>{blog.title}</h2>
                  <div className="text-content">
                    {expandedBlogId === blog.id ? (
                      <div>
                        <pre>{blog.formattedContent}</pre>
                        <button className='read-more' onClick={() => handlePdfClick(blog.pdfUrl)}>Read More</button>
                      </div>
                    ) : (
                      <p>{blog.formattedContent.split('\n')[0].substring(0, 100)}...</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="content">
                  <h2>{blog.title}</h2>
                  <div className="text-content">
                    {expandedBlogId === blog.id ? (
                      <div>
                        <pre>{blog.formattedContent}</pre>
                        <button className='read-more' onClick={() => handlePdfClick(blog.pdfUrl)}>Read More</button>
                      </div>
                    ) : (
                      <p>{blog.formattedContent.split('\n')[0].substring(0, 100)}...</p>
                    )}
                  </div>
                </div>
                {blog.images.length > 0 && (
                  <img src={blog.images[0]} alt={blog.title} className="blog-image" />
                )}
              </>
            )}
          </div>
        ))}
      </div>
      {/* {selectedPdf && (
        <PDFModal pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />
      )} */}
      {/* </div> */} 
      <div className={styles.background}>
        <LandingHeader></LandingHeader>
        <div className={styles.blogContainer}>
          {blogs.map((blog,index)=>(<>{console.log(blog.title)}
          {console.log(blog.content)}
          <BlogCard
            heading =  {blog.title}
            content = {blog.content}

            image={blog.images[0]}
          ></BlogCard>
          
          </>)
          )}
          <span style={{height:"10px"}}> ‎ ‎   </span>
        </div>
      </div>
    </>

  );
};

export default Blogs;
