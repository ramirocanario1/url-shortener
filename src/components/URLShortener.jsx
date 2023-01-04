import React, { useRef, useState } from 'react'
import styles from '../styles/URLShortener.module.css'
import '../styles/general.css'
import useFetch from '../hooks/useFetch'

import { TbCopy, TbSend } from "react-icons/tb";

export default function URLShortener() {

  const input = useRef(null)
  const status = useRef(null)
  const result = useRef(null)
  const copy = useRef(null)
  const copy_label = useRef(null)

  const [longUrl, setLongUrl] = useState('');
  const [isLoading, data, error] = useFetch({longUrl})
  
  function handleSubmit(e) {
    e.preventDefault()
    const url = input.current.value
    setLongUrl(url)
    result.current.classList.remove('hidden')
    copy_label.current.innerHTML = "Copy!";
  }

  function handleCopy(e) {
    navigator.clipboard.writeText(data.result.full_short_link)
    copy_label.current.innerHTML = 'Copied!'
  }

  function getStatus() {
    if (error) {
      return 'Oops! Error 😢'
    }
    return isLoading ? "Generating URL... 🤔" : "New URL generated! 👇";
  }

  function getCopyButton() {
    if (data?.result?.full_short_link) {
      return (
        <div className={styles.copy_container} ref={copy}>
          <button onClick={handleCopy} className={styles.copy_button}>
            <TbCopy className={styles.copy_icon} />
          </button>
          <span ref={copy_label}>Copy!</span>
        </div>
      );
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="inputurl">URL to shorten</label>
        <div className={styles.input_container}>
          <input
            type="text"
            name="inputurl"
            ref={input}
            placeholder="https://www.myurl.com"
          />
          <button>
            <TbSend className={styles.send_icon} />
          </button>
        </div>
      </form>
      <div className={`${styles.result} hidden`} ref={result}>
        <h2 ref={status} className={styles.status_message}>
          {getStatus()}
        </h2>
        <div className={styles.result_link}>
          <h2>
            <a href={data?.result?.full_short_link} target="_blank">
              {data?.result?.full_short_link}
            </a>
          </h2>
          {getCopyButton()}
        </div>
      </div>
    </main>
  );
}