import { db } from "../../db";
import { createId } from "../../utils/id";

export const getUserIdFromTokens = ({
  token,
  secret,
}: {
  token: string;
  secret: string;
}) => {
  return db
    .query(
      `
      SELECT
        user_id
      FROM
        user_auth_twitter
      WHERE
        token = :token,
        secret = :secret
      `,
      {
        replacements: {
          token,
          secret,
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

export const getAuthFromUser = ({ user_id }: { user_id: string }) => {
  return db
    .query(
      `
      SELECT
        *
      FROM
        user_auth_twitter
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
  twitter_id,
  oauth_token,
  oauth_verifier,
}: {
  user_id: string;
  twitter_id: string;
  oauth_token?: string;
  oauth_verifier?: string;
}) => {
  console.log("createAuth", { user_id, twitter_id });
  return db
    .query(
      `
      INSERT INTO
        user_auth_twitter
        (id, user_id, twitter_id, oauth_token, oauth_verifier, created, updated)
      VALUES
        (:id, :user_id, :twitter_id, :oauth_token, :oauth_verifier, :created, :updated)
      `,
      {
        replacements: {
          id: createId(),
          user_id,
          twitter_id,
          oauth_token: oauth_token || "",
          oauth_verifier: oauth_verifier || "",
          created: new Date(),
          updated: new Date(),
        },
      }
    )
    .then(([results, metadata]: [any, any]) => {
      return { id: user_id, twitter_id };
    })
    .catch((error: Error) => {
      return error;
    });
};

export const updateAuth = ({
  user_id,
  token,
  secret,
}: {
  user_id: string;
  token: string;
  secret: string;
}) => {
  return db
    .query(
      `
      UPDATE
        user_auth_twitter
      SET
        token = :token,
        secret = :secret,
        updated = :updated
      WHERE
        user_id = :user_id
      `,
      {
        replacements: {
          user_id,
          token,
          secret,
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

export const getUserIdByTwitterId = (twitter_id: string) => {
  return db
    .query(
      `
    SELECT
      *
    FROM
      user_auth_twitter
    WHERE
      twitter_id = :twitter_id
    `,
      {
        replacements: {
          twitter_id,
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
