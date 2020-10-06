<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Skill;

class SkillController extends AbstractController
{
    /**
     * @Route("/api/skills", name="skills")
     * @Method("GET")
     */
    public function skills()
    {
        $skills = $this->getDoctrine()
            ->getRepository(Skill::class)
            ->findAll();

        return new JsonResponse($skills);
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

        return new JsonResponse($skills);
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

        return new JsonResponse($skills);
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

        return new JsonResponse($skills);
    }
}
