import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const BURGER_UID = 'burger_uid'
const BURGER_AID = 'burger_aid'

export default function MagicButton() {
  const [targetBurgerUID, setBurgerTargetUID] = useState(localStorage.getItem(BURGER_UID))
  const [targetBurgerAID, setBurgerTargetAID] = useState(localStorage.getItem(BURGER_AID))
  const [spamming, setSpamming] = useState(false)

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  function sendRequest() {
    const formData = new FormData()
    formData.append('type', 'like')
    formData.append('collerette_uid', targetBurgerUID)
    formData.append('aid', targetBurgerAID) // 776

    axios({
      method: 'post',
      url: 'https://www.quick.be/fr/giantdesigners/likeShareCollerette',
      data: formData,
      headers: {
        Cookies: `_quick=${uuidv4()}; GDPR-cookie-accepted=10-20-30-40;`,
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
      },
    }).then((res) => {
      // eslint-disable-next-line no-console
      console.log(res.data.value)
    })
  }

  function saveBurgerId() {
    localStorage.setItem(BURGER_UID, targetBurgerUID)
    localStorage.setItem(BURGER_AID, targetBurgerAID)
  }

  useEffect(async () => {
    saveBurgerId()

    while (spamming) {
      // eslint-disable-next-line no-console
      console.log('Sending request...')
      sendRequest()

      // eslint-disable-next-line no-await-in-loop
      await sleep(6000)
    }
  }, [spamming])

  return (
    <>
      <input
        placeholder="Target burger UID"
        value={targetBurgerUID || ''}
        onChange={(e) => { setBurgerTargetUID(e.target.value) }}
      />
      <input
        placeholder="Target burger AID"
        value={targetBurgerAID || ''}
        onChange={(e) => { setBurgerTargetAID(e.target.value) }}
      />
      <button
        type="button"
        onClick={() => { setSpamming(!spamming) }}
        color={spamming ? '#b60c0c' : '#3bbf3d'}
      >
        {spamming ? 'Stop spamming!' : 'Spam !'}
      </button>
    </>
  )
}
