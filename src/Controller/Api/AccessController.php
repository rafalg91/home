<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Access;
use Doctrine\ORM\EntityManagerInterface;

class AccessController extends AbstractController
{
	/**
	 * @Route("/api/access", name="access")
	 * @Method("GET")
	 */
	public function access(EntityManagerInterface $en)
	{
		$access = $en->getRepository(Access::class)->findAll();

		return new JsonResponse($access);
	}

	/**
	 * @Route("/api/access/add", format="json", name="addAccess")
	 * @Method("POST")
	 */
	public function addAccess(Request $request, EntityManagerInterface $en)
	{
		$request->getContent();

		$access = new Access();
		$access->setName($request->get('name'));

		$en->persist($access);
		$en->flush();

		$allAccess = $en->getRepository(Access::class)->findAll();

		return new JsonResponse($allAccess);
	}

	/**
	 * @route("/api/access/{id}/edit", format="json", name="updateAccess")
	 * @Method("PATCH")
	 */
	public function updateAccess($id, Request $request, EntityManagerInterface $en)
	{
		$rep = $en->getRepository(Access::class);
		$access = $rep->find($id);

		$access->setName($request->get('name'));
		$en->flush();

		$allAccess = $rep->findAll();

		return new JsonResponse($allAccess);
	}

	/**
	 * @Route("/api/access/{id}/remove", name="remoweAccess")
	 * @Method("DELETE")
	 */
	public function removeAccess($id, EntityManagerInterface $en)
	{
		$rep = $en->getRepository(Access::class);

		$access = $rep->find($id);
		$en->remove($access);
		$en->flush();

		$allAccess = $rep->findAll();

		return new JsonResponse($allAccess);
	}
}