import React, { useState } from 'react';
import styles from './BlogCard.module.css';

type BlogCardProps = {
  heading: string;
  content: string;
  image: string;
};

const BlogCard: React.FC<BlogCardProps> = ({ heading, content, image }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.masterContainer} onClick={toggleExpand}>
        {isExpanded ? (
            <div className={styles.container}>
            <img src={image} alt={heading} className={styles.image} />
            <div className={styles.content}>
              <p className={styles.heading}>{heading}</p>
              {/* Conditionally render content based on isExpanded */}
                <p>
                  {content.length > 300 ? `${content.substring(0, 300)}...` : `${content}`}
                </p>
            </div>
            </div>
        ): (            
        <div className={styles.containerExpanded}>
            <div className={styles.content}>
              <p className={styles.heading}>{heading}</p>
              {/* Conditionally render content based on isExpanded */}
                <p>
                  {content}
                </p>
            </div>
            {/* <a href="https://www.example.com" target="_blank" className={styles.readMoreBtn}>Read More</a> */}
        </div>
        )}
    
    </div>
  );
};

export default BlogCard;
