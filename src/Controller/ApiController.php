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
     * @Method("DELETE")
     */
    public function addworker(Request $request)
    {
        $request->getContent();
        $entityManager = $this->getDoctrine()->getManager();

        $worker = new Worker();
        $worker->setName($request->get('name'));

        $entityManager->persist($worker);
        $entityManager->flush();

        return new Response(json_encode($worker));
    }

    /**
     * @Route("/api/workers/{id}", format="json", name="removeworker")
     * @Method("DELETE")
     */
    public function removeWorker($id)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $worker = $entityManager->getRepository(Worker::class)->find($id);

        $entityManager->remove($worker);
        $entityManager->flush();

        return new Response(json_encode($worker));
    }
}
