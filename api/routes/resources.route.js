import { Router } from 'express';
import express from 'express'
import { getResources, postResourceId, putResourceIdPosition } from '../services/resources.js';
const router = new Router();

//pour avoir le body
router.use(express.json());

router.get('/', async (req, res, next) => {
  let options = { 
  };


  try {
    const result = await getResources(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.post('/:resourceId', async (req, res, next) => {
  let options = { 
    "resourceId": req.params.resourceId,
  };

  options.operationType = req.body;

  try {
    const result = await postResourceId(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.put('/:resourceId/position', async (req, res, next) => {
  let options = { 
    "resourceId": req.params.resourceId,
  };

  options.latLng = req.body;
  
  try {
    const result = await putResourceIdPosition(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});

export default router;