import { useEffect, useState, startTransition } from 'react'
import { createUser } from '../../utils/request'
import { useNavigate, useSearchParams } from 'react-router-dom'
import transition from '../../animation/transition'
import { ToastContainer, Slide, toast } from 'react-toastify'
import throttle from 'lodash/throttle'

import styles from './index.module.css'
import header from '../../assets/store/header.webp'

function Entry() {
  const navigate = useNavigate()
  const [isSubmitted, setIsSubmitted] = useState(false)

  // read parameters
  const [searchParams] = useSearchParams()
  const prolificPid = searchParams.get('PROLIFIC_PID')

  // track participant info
  useEffect(() => {
    if (!prolificPid) {
      navigate('/error')
    }
  }, [prolificPid, navigate])

  // functions
  const throttledSubmit = throttle(async () => {
    if (isSubmitted) return
    toast.promise(
      async () => {
        await createUser(prolificPid, navigate)
      },
      {
        pending: 'Loading...',
      }
    )
    setIsSubmitted(true)
  }, 10000)

  const onSubmit = (e) => {
    e.preventDefault()
    throttledSubmit()
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="light"
        transition={Slide}
      />
      <img src={header} style={{ width: '100%' }} alt="" />
      <div className={styles.main}>
        <div className={styles.content}>
          <p>
            <strong>Study title: </strong> Smartphone news app user study
          </p>
          <div className={styles.container}>
            <div className={styles.item}>
              <strong>Supervisor</strong>
              <br /> Bailey Kacsmar
              <br /> University of Alberta
              <br /> kacsmar@ualberta.ca
            </div>
            <div className={styles.item}>
              <strong>Research Assistant</strong>
              <br /> Jialiang Yan
              <br /> University of Alberta
              <br /> jialian6@ualberta.ca
            </div>
          </div>
          <p>
            The purpose of this study is to improve the user experience from app
            installation to app usage. To do this, you will perform a simulated
            app installation and usage task in our site and then answer a
            questionnaire. All these activities will take place in your browser.
          </p>
          <p>
            You must meet the following criteria to participate in this study:
          </p>
          <ul className={styles.lst}>
            <li>Between the ages of 18 and 65</li>
            <li>English speaking</li>
            <li>Within North America</li>
            <li>iPhone user</li>
          </ul>
          <p>Your participation should take around 10 minutes.</p>
          <div className={styles.title2}>Benefits</div>
          <p>
            Other than the receipt of a small honorarium, you will not directly
            benefit from your participation. Information gathered in this
            research will help us improve existing smartphone user experience
            and develop new interaction design that could benefit users.
          </p>
          <div className={styles.title2}>Risk</div>
          <p>
            We will require you to interact with our news app for two minutes.
            It may make you feel tired or bored. Besides, while it is always
            possible that someone can figure out who participated in a study, we
            will remove all identifying information from your data before
            analyzing it in order to make it harder for people to tell who has
            participated.
          </p>
          <p>
            There are no other foreseeable risks. If at any time, we become
            aware of additional risks, we will postpone the study and notify you
            immediately so that these risks can be minimized before we continue
            with research activities. If it is necessary, we will stop the study
            altogether.
          </p>
          <div className={styles.title2}>Remuneration/Compensation</div>
          <p>
            To thank you for your time, you will be eligible to receive $6 after
            completing the study. Besides, we will be pleased to make a summary
            of the results available to you once they have been compiled.
          </p>
          <div className={styles.title2}>Confidentiality & Anonymity</div>
          <p>
            No one will be identified in this study, except for the initial
            collection of your prolific ID for processing remuneration. Once we
            have processed your payment, we will delete your prolific ID from
            our dataset. All data and documents will be securely kept for a
            period of at least 5 years after we have finished our research
            activities. Data may be kept for even longer. If we decide not to
            keep it after 5 years, it will be destroyed. Once data is submitted,
            you may choose to withdraw some or all of your responses by
            contacting Bailey Kacsmar within 24 hours of submitting your
            responses. We are unable to remove your answers after that time
            because we will have removed your prolific id from our dataset and
            the researchers will no longer have a way of knowing which data
            belongs to which participant. Reports and publications detailing the
            results of this study will describe aggregate data.
          </p>
          <div className={styles.title2}>
            Voluntary Participation & Freedom to Withdraw
          </div>
          <p>
            You get to choose whether you want to complete study activities. It
            is okay if you don't want us to use your data. We can always exclude
            your data while analyzing that of others. You may withdraw at any
            time. To withdraw, exit our study website and we will destroy any of
            the data that we have collected from you.
          </p>
          <p>
            If you do not participate in this study or choose to withdraw from
            this study, the data that was collected during your participation
            will be destroyed. Note that you cannot have your data removed if
            you have already completed this study.
          </p>
          <div className={styles.title2}>Further Information</div>
          <p>
            Please contact Bailey, by email at{' '}
            <a href="">kacsmar@ualberta.ca</a> , or Jialiang, by email at{' '}
            <a href="">jialian6@ualberta.ca</a>, if you would like to know more.
            They are both happy to answer questions about this study and what we
            are doing. Please contact either of them if you have any questions
            or concerns.
          </p>
          <p>
            The plan for this study has been reviewed by a Research Ethics Board
            at the University of Alberta (Pro00142737). If you have any
            questions regarding your rights as a research participant, you may
            contact the University of Alberta Research Ethics Office at{' '}
            <a href="">reoffice@ualberta.ca</a> or 780-492-2615 and quote Ethics
            ID Pro00142737. This office is independent of the study
            investigators.
          </p>
        </div>
        {/* Form */}
        <div className={styles.form}>
          <p>
            I have read this form. I have been told whom to contact if I have
            questions, and I am able to print a copy of this consent form for
            myself.
          </p>
          <form onSubmit={onSubmit}>
            <button type="submit" className={styles.icbtn}>
              agree to participate in the research study described above (You
              can use my data)
            </button>
          </form>
          <button
            className={styles.icbtn}
            onClick={() => {
              window.location.href = 'https://www.prolific.com/'
            }}
          >
            do not want to participate (I want my data excluded)
          </button>
        </div>
      </div>
    </div>
  )
}

export default transition(Entry)
