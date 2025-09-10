import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_ENPOINT } from "../../config";
import "./faq.scss";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

function HomeFaq() {
  const [faqQA, setFaqQA] = useState([]);
  const [open, setOpen] = useState("");

  const toggle = (id) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await axios.get(`${BACKEND_ENPOINT}/faq`);
        // console.log("FAQ API Response:", res.data);
        setFaqQA(Array.isArray(res.data) ? res.data : res.data.data || []);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setFaqQA([]); // fallback
      }
    };
    fetchFaq();
  }, []);

  return (
    <div className="faq">
      <h2 className="heading">FAQs</h2>

      <Accordion open={open} toggle={toggle} className="faq-section">
        {Array.isArray(faqQA) &&
          faqQA.map((faq, index) => {
            const id = String(index + 1);
            return (
              <AccordionItem key={id}>
                <AccordionHeader targetId={id}>{faq.question}</AccordionHeader>
                <AccordionBody accordionId={id}>{faq.answer}</AccordionBody>
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
}

export default HomeFaq;
