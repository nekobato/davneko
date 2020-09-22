import { db } from "../../db";
import { createId } from "../../utils/id";

export const getUserIdFromAuth = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return db
    .query(
      `
      SELECT
        user_id
      FROM
        user_auth_local
      WHERE
        email = :email
      AND
        password = :password
      `,
      {
        replacements: {
          email,
          password,
        },
      }
    )
    .then(([results, metadata]: [any, any]) => {
      return results[0];
    })
    .catch((error: Error) => {
      return error;
    });
};

export const getAuth = ({ user_id }: { user_id: string }) => {
  return db
    .query(
      `
      SELECT
        *
      FROM
        user_auth_local
      WHERE
        user_id = :user_id
      `,
      {
        replacements: {
          user_id,
        },
      }
    )
    .then(([results, metadata]: [any, any]) => {
      return results[0];
    })
    .catch((error: Error) => {
      return error;
    });
};

export const createAuth = ({
  user_id,
  email,
  password,
}: {
  user_id: string;
  email: string;
  password: string;
}) => {
  return db
    .query(
      `
      INSERT INTO
        user_auth_local
        (id, user_id, email, password, created, updated)
      VALUES
        (:id, :user_id, :token, :password, :created, :updated)
      `,
      {
        replacements: {
          id: createId(),
          user_id,
          email,
          password,
          created: new Date(),
          updated: new Date(),
        },
      }
    )
    .then(([results, metadata]: [any, any]) => {
      return results;
    })
    .catch((error: Error) => {
      return error;
    });
};

export const updateAuth = ({
  user_id,
  email,
  password,
}: {
  user_id: string;
  email: string;
  password: string;
}) => {
  return db
    .query(
      `
      UPDATE
        user_auth_local
      SET
        email = :email,
        password = :password,
        updated = :updated
      WHERE
        user_id = :user_id
      `,
      {
        replacements: {
          user_id,
          email,
          password,
          updated: new Date(),
        },
      }
    )
    .then(([results, metadata]: [any, any]) => {
      return results;
    })
    .catch((error: Error) => {
      return error;
    });
};
