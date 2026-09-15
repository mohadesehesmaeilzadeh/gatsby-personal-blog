import * as React from "react"
import { useState } from "react"

import Layout from "../components/Layout/Layout"
import * as styles from "./contact.module.css"

const initialFormData = {
  name: "",
  email: "",
  message: "",
}

const validateForm = formData => {
  const nextErrors = {}
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!formData.name.trim()) {
    nextErrors.name = "Name is required."
  } else if (formData.name.trim().length < 2) {
    nextErrors.name = "Name must be at least 2 characters."
  }

  if (!formData.email.trim()) {
    nextErrors.email = "Email is required."
  } else if (!emailPattern.test(formData.email.trim())) {
    nextErrors.email = "Please enter a valid email address."
  }

  if (!formData.message.trim()) {
    nextErrors.message = "Message is required."
  } else if (formData.message.trim().length < 10) {
    nextErrors.message = "Message must be at least 10 characters."
  }

  return nextErrors
}

const ContactPage = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = event => {
    const { name, value } = event.target

    setFormData(currentFormData => ({
      ...currentFormData,
      [name]: value,
    }))

    setErrors(currentErrors => ({
      ...currentErrors,
      [name]: "",
    }))
    setSubmitted(false)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const validationErrors = validateForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSubmitted(false)
      return
    }

    // Frontend demo only: this does not send an email or save data.
    console.log("Contact form submitted:", formData)

    setFormData(initialFormData)
    setErrors({})
    setSubmitted(true)
  }

  return (
    <Layout>
      <section className={styles.header}>
        <h1>Contact Me</h1>
        <p>
          Have a question, project idea, or just want to say hello? Feel free to
          send me a message.
        </p>
      </section>

      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {submitted ? (
            <p className={styles.successMessage} role="status">
              Thanks for reaching out! Your message was submitted successfully.
            </p>
          ) : null}

          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name ? (
              <p id="name-error" className={styles.errorMessage} role="alert">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email ? (
              <p id="email-error" className={styles.errorMessage} role="alert">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message ? (
              <p
                id="message-error"
                className={styles.errorMessage}
                role="alert"
              >
                {errors.message}
              </p>
            ) : null}
          </div>

          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>

        <aside className={styles.note}>
          <h2>Let's connect</h2>
          <p>You can also find me on GitHub.</p>
          <a
            href="https://github.com/mohadesehesmaeilzadeh"
            target="_blank"
            rel="noreferrer"
          >
            Visit my GitHub
          </a>
        </aside>
      </div>
    </Layout>
  )
}

export default ContactPage

export const Head = () => (
  <>
    <title>Contact | Mohadeseh</title>
    <meta
      name="description"
      content="Contact Mohadeseh, a frontend developer."
    />
  </>
)
