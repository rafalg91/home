<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Worker;
use App\Entity\Skill;

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
     * @Route("/api/skills", name="skills")
     * @Method("GET")
     */
    public function skills()
    {
        $skills = $this->getDoctrine()
            ->getRepository(Skill::class)
            ->findAll();

        return new Response(json_encode($skills));
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

        return new Response(json_encode($workers));
    }

    /**
     * @Route("/api/skills/add", format="json", name="addskill")
     * @Method("POST")
     */
    public function addSkill(Request $request)
    {
        $request->getContent();
        $em = $this->getDoctrine()->getManager();

        $skill = new Skill();
        $skill->setName($request->get('name'));

        $em->persist($skill);
        $em->flush();

        $skills = $em->getRepository(Skill::class)->findAll();

        return new Response(json_encode($skills));
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
     * @Route("/api/skills/{id}", format="json", name="removeskill")
     * @Method("DELETE")
     */
    public function removeSkill($id)
    {
        $em = $this->getDoctrine()->getManager();
        $rep = $em->getRepository(Skill::class);
        $skill = $rep->find($id);

        $em->remove($skill);
        $em->flush();

        $skills = $rep->findAll();

        return new Response(json_encode($skills));
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

        return new Response(json_encode($workers));
    }

    /**
     * @Route("/api/skills/{id}/edit", format="json", name="updateskill")
     * @Method("PATCH")
     */
    public function updateSkill($id, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $rep = $em->getRepository(Skill::class);
        $skill = $rep->find($id);

        $skill->setName($request->get('name'));
        $em->flush();

        $skills = $rep->findAll();

        return new Response(json_encode($skills));
    }
}
