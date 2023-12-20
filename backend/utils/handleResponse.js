export const handleResponse = (...props) => {
  const [actionFunction, req, res] = props;
  return actionFunction(req, res)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      const { status, message } = error;
      res.status(status).send(message);
    });
};
