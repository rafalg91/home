<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Worker;
use App\Entity\Skill;
use App\Entity\Access;
use App\Entity\Log;

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

        //$skills = $worker->getSkills()->toArray();

        return new JsonResponse($worker);
    }

    /**
     * @Route("/api/workers/{id}/access/{id_access}", name="removeworkeraccess")
     * @Method("DELETE")
     */
    public function removeAccess($id, $id_access)
    {
        $date = new \DateTime();

        $em = $this->getDoctrine()->getManager();
        $worker = $em->getRepository(Worker::class)->find($id);
        $access = $em->getRepository(Access::class)->find($id_access);
        $worker->removeAccess($access);

        $log = new Log();
        $log->setDate($date);
        $log->setAccess($access);
        $log->setWorker($worker);
        $log->setStatus(false);

        $em->persist($log);
        $em->flush();

        return new JsonResponse($worker);
    }

    /**
     * @Route("/api/workers/add_skill", format="json", name="addworkerskill")
     * @Method("POST")
     */
    public function addSkill(Request $request)
    {
        $request->getContent();
        $id_worker = $request->get('worker');
        $id_skill = $request->get('skill');

        $em = $this->getDoctrine()->getManager();
        $worker = $em->getRepository(Worker::class)->find($id_worker);
        $skill = $em->getRepository(Skill::class)->find($id_skill);
        $worker->addSkill($skill);
        $em->flush();

        return new JsonResponse($worker);
    }

    /**
     * @Route("/api/workers/add_access", format="json", name="addworkeraccess")
     * @Method("POST")
     */
    public function addAccess(Request $request, EntityManagerInterface $em)
    {
        $date = new \DateTime();

        $request->getContent();
        $id_worker = $request->get('worker');
        $id_access = $request->get('access');

        $worker = $em->getRepository(Worker::class)->find($id_worker);
        $access = $em->getRepository(Access::class)->find($id_access);

        if(!$worker->containAccess($access)) {
            $worker->addAccess($access);

            $log = new Log();
            $log->setDate($date);
            $log->setAccess($access);
            $log->setWorker($worker);
            $log->setStatus(true);

            $em->persist($log);
            $em->flush();
        }

        return new JsonResponse($worker);
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

        //$workers = $rep->findAll();

        return new JsonResponse($worker);
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

        //$workers = $rep->findAll();

        return new JsonResponse($worker);
    }
}
