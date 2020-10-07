<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Worker;
use App\Entity\Skill;

class WorkerController extends AbstractController
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

        return new JsonResponse($workers);
    }

    /**
     * @Route("/api/workers/{id}/skills", name="workersskills")
     * @Method("GET")
     */
    public function skills($id)
    {
        $worker = $this->getDoctrine()->getRepository(Worker::class)->find($id);
        $skills = $worker->getSkills()->toArray();

        return new JsonResponse($skills);
    }

    /**
     * @Route("/api/workers/{id}/skills/{id_skill}", name="removeworkerskill")
     * @Method("DELETE")
     */
    public function removeSkills($id, $id_skill)
    {
        $em = $this->getDoctrine()->getManager();
        $worker = $em->getRepository(Worker::class)->find($id);
        $skill = $em->getRepository(Skill::class)->find($id_skill);
        $worker->removeSkill($skill);
        $em->flush();

        $skills = $worker->getSkills()->toArray();

        return new JsonResponse($skills);
    }

    /**
     * @Route("/api/workers/add", format="json", name="addworker")
     * @Method("POST")
     */
    public function addWorker(Request $request)
    {
        $request->getContent();
        $em = $this->getDoctrine()->getManager();

        $worker = new Worker();
        $worker->setName($request->get('name'));
        $worker->setSurname($request->get('surname'));

        $em->persist($worker);
        $em->flush();

        $workers = $em->getRepository(Worker::class)->findAll();

        return new JsonResponse($workers);
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

        return new JsonResponse($workers);
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
        $worker->setSurname($request->get('surname'));
        $em->flush();

        $workers = $rep->findAll();

        return new JsonResponse($workers);
    }
}
