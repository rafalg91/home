<?php

namespace App\Controller\Api;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Log;
use App\Entity\Worker;
use App\Entity\Access;

class LogController extends AbstractController
{
    /**
     * @Route("/api/logs", name="logs")
     * @Method("GET")
     */
    public function logs(EntityManagerInterface $en)
    {
        $logs = $en->getRepository(Log::class)->findAll();
        return new JsonResponse($logs);
    }

    /**
     * @Route("/api/logs/add", format="json", name="addLog")
     * @Method("POST")
     */
    public function addLog(Request $request, EntityManagerInterface $en)
    {
        $request->getContent();
        $worker = $en->getRepository(Worker::class)->find($request->get('worker'));
        $access = $en->getRepository(Access::class)->find($request->get('access'));

        $log = new Log();
        $log->setStatus($request->get('status'));
        $log->setWorker($worker);
        $log->setAccess($access);

        $en->persist($log);
        $en->flush();

        $logs = $en->getRepository(Log::class)->findAll();

        return new JsonResponse($logs);
    }
}
