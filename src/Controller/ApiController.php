<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Worker;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;

class ApiController extends AbstractController
{
    /**
     * @Route("/api/workers", name="workers")
     * @Method("GET")
     */
    public function workers()
    {
        $workers = $this->getDoctrine()
            ->getRepository(Worker::class)
            ->findAll();

        return new Response(json_encode($workers));
    }

    /**
     * @Route("/api/workers/add", format="json", name="addworker")
     * @Method("POST")
     */
    public function addworker(Request $request)
    {
        $request->getContent();
        $em = $this->getDoctrine()->getManager();

        $worker = new Worker();
        $worker->setName($request->get('name'));

        $em->persist($worker);
        $em->flush();

        $workers = $em->getRepository(Worker::class)->findAll();

        return new Response(json_encode($workers));
    }

    /**
     * @Route("/api/workers/{id}", format="json", name="removeworker")
     * @Method("DELETE")
     */
    public function removeWorker($id)
    {
        $em = $this->getDoctrine()->getManager();
        $rep = $em->getRepository(Worker::class);
        $worker = $rep->find($id);

        $em->remove($worker);
        $em->flush();

        $workers = $rep->findAll();

        return new Response(json_encode($workers));
    }

    /**
     * @Route("/api/workers/{id}/edit", format="json", name="updateworker")
     * @Method("PATCH")
     */
    public function updateWorker($id, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $rep = $em->getRepository(Worker::class);
        $worker = $rep->find($id);

        $worker->setName($request->get('name'));
        $em->flush();

        $workers = $rep->findAll();

        return new Response(json_encode($workers));
    }
}
