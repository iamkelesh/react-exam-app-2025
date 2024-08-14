import React, { useContext, useState } from 'react';
import { useForm } from '../../hooks/useForm';

import { useNavigation } from '../../contexts/navigationContext';
import styles from './Create.module.css';
import { createService } from '../../services/postsServices';
import AuthContext from '../../contexts/authContext';


const initialValues = {
  title: '',
  body: '',
}

function Create() {
  const navigate = useNavigation();
  const { accessToken } = useContext(AuthContext)
  const { values, onChange, onSubmit } = useForm(createService, initialValues, accessToken, navigate);

  return (
    <div className={styles.container}>
      <form id={styles.contact} action="" method="post" onSubmit={onSubmit}>
        <h3 className={styles.h3}>Create post</h3>
        <h4 className={styles.h4}>Enter post details!</h4>

        <fieldset className={styles.fieldset}>
          <input
            placeholder="Title"
            type="text"
            tabIndex={2}
            required
            name='title'
            className={styles.input}
            onChange={onChange}
            value={values.title}
          />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <input
            placeholder="Body"
            type="text"
            tabIndex={1}
            required
            autoFocus
            name='body'
            className={styles.input}
            onChange={onChange}
            value={values.body}
          />
        </fieldset>

        <fieldset>
          <button
            name="submit"
            type="submit"
            id="contact-submit"
            data-submit="...Sending"
          >
            Submit
          </button>
        </fieldset>

      </form>
    </div>
  );
}

export default Create;