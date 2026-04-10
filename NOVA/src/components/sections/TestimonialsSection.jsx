import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ handleShuffle, testimonial, position, id, author, text }) => {
    const dragRef = useRef(0);
    const isFront = position === "front";

    return (
        <motion.div
            style={{
                zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
            }}
            animate={{
                rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
                x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%"
            }}
            drag={true}
            dragElastic={0.35}
            dragListener={isFront}
            dragConstraints={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
            onDragStart={(e) => {
                dragRef.current = e.clientX;
            }}
            onDragEnd={(e) => {
                if (dragRef.current - e.clientX > 150) {
                    handleShuffle();
                }
                dragRef.current = 0;
            }}
            transition={{ duration: 0.35 }}
            className={`testimonial-glass-card ${isFront ? "cursor-grab active:cursor-grabbing" : ""}`}
        >
            <img
                src={`https://i.pravatar.cc/128?img=${id}`}
                alt={`Avatar of ${author}`}
                className="testimonial-avatar"
            />
            <span className="testimonial-glass-text">"{text}"</span>
            <span className="testimonial-glass-author">{author}</span>
        </motion.div>
    );
};

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([
        {
            id: 1,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: "Alex Johnson",
            role: "Student, CSE Department"
        },
        {
            id: 2,
            text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            author: "Sarah Williams",
             role: "Tech Enthusiast"
        },
        {
            id: 3,
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            author: "Michael Chen",
            role: "Innovation Lead"
        },
        {
            id: 4,
            text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            author: "Emily Davis",
            role: "Community Member"
        },
        {
            id: 5,
            text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
            author: "David Martinez",
            role: "Event Participant"
        },
        {
            id: 6,
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
            author: "Jessica Taylor",
            role: "NOVA Member"
        }
    ]);

    const handleShuffle = () => {
        setTestimonials((prevTestimonials) => {
            const newArray = [...prevTestimonials];
            newArray.unshift(newArray.pop());
            return newArray;
        });
    };

    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <h2 className="testimonials-heading">What People Say About NOVA</h2>
                <p className="testimonials-subheading">Drag the cards to explore testimonials</p>

                <div className="testimonials-card-stack">
                    {testimonials.map((testimonial, index) => {
                        let position = "back";
                        if (index === 0) position = "front";
                        else if (index === 1) position = "middle";

                        return (
                            <TestimonialCard
                                key={testimonial.id}
                                handleShuffle={handleShuffle}
                                testimonial={testimonial.text}
                                position={position}
                                id={testimonial.id}
                                author={testimonial.author}
                                text={testimonial.text}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
